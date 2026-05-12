import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

import { publicApi } from '../lib/api'

function getGalleryAlt(image) {
  return image?.caption || image?.altText || image?.title || 'Gallery photo'
}

export default function GalleryPage() {
  const [filter, setFilter] = useState('all')
  const [lightbox, setLightbox] = useState(null)
  const [galleryImages, setGalleryImages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const touchStartYRef = useRef(null)

  useEffect(() => {
    let isMounted = true

    const loadGallery = async () => {
      try {
        setIsLoading(true)
        setError('')
        const response = await publicApi.getGallery()
        if (isMounted) {
          setGalleryImages(response.data.items || [])
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError.message || 'Failed to load gallery')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadGallery()

    return () => {
      isMounted = false
    }
  }, [])

  const visibleGalleryImages = galleryImages.filter((item) => item.url)
  const categories = ['all', ...new Set(visibleGalleryImages.map((item) => item.category))]
  const filtered = filter === 'all' ? visibleGalleryImages : visibleGalleryImages.filter((img) => img.category === filter)

  const openLightbox = (img) => {
    setLightbox(filtered.findIndex((item) => item.id === img.id))
  }

  const closeLightbox = () => {
    setLightbox(null)
  }

  const navigate = (direction) => {
    setLightbox((current) => {
      const next = current + direction
      if (next < 0) return filtered.length - 1
      if (next >= filtered.length) return 0
      return next
    })
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeLightbox()
      }
    }

    window.addEventListener('keydown', handleKeyDown, true)
    document.addEventListener('keydown', handleKeyDown, true)
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true)
      document.removeEventListener('keydown', handleKeyDown, true)
    }
  }, [])

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      closeLightbox()
    }
  }

  const handleTouchStart = (event) => {
    touchStartYRef.current = event.touches?.[0]?.clientY ?? null
  }

  const handleTouchEnd = (event) => {
    const startY = touchStartYRef.current
    touchStartYRef.current = null

    if (startY === null) {
      return
    }

    const endY = event.changedTouches?.[0]?.clientY ?? startY
    if (endY - startY > 80) {
      closeLightbox()
    }
  }

  return (
    <div className="pt-20 min-h-screen bg-bg-page animate-fadeIn">
      <div className="py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-center section-title-treatment text-[40px] md:text-[52px]">Gallery</h1>
          <p className="tagline text-center text-[18px] md:text-[22px]">A visual journey through our culinary heritage</p>

          <div className="flex justify-center gap-2 md:gap-4 mb-8 md:mb-12 flex-wrap mt-8 md:mt-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 md:px-6 py-2 rounded-full text-[12px] md:text-[14px] font-semibold transition ${
                  filter === category ? 'bg-gold text-bg-page' : 'bg-bg-card text-text-secondary border border-gold-dim hover:border-gold'
                }`}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="text-center text-text-secondary py-20">Loading gallery...</div>
          ) : error ? (
            <div className="text-center text-red-300 py-20">{error}</div>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-2 md:gap-4 space-y-2 md:space-y-4">
              {filtered.map((img) => (
                <div
                  key={img.id}
                  onClick={() => openLightbox(img)}
                  className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-lg"
                >
                  <img src={img.url} alt={getGalleryAlt(img)} className="w-full rounded-lg transition transform group-hover:scale-110" loading="lazy" />
                  <div className="pointer-events-none absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <span className="text-gold text-4xl">+</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {lightbox !== null && filtered[lightbox] && (
        <div
          className="fixed inset-0 z-[9990] flex items-center justify-center bg-black/95 p-4"
          onClick={handleBackdropClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              closeLightbox()
            }}
            className="fixed right-4 top-4 z-[9999] flex h-11 min-h-[44px] w-11 min-w-[44px] items-center justify-center rounded-full border border-white/15 bg-black/60 text-white transition hover:bg-black/80"
            aria-label="Close gallery photo"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              navigate(-1)
            }}
            className="fixed left-4 top-1/2 z-[9998] flex h-11 min-h-[44px] w-11 min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80 hover:text-gold md:h-14 md:w-14"
            aria-label="Previous gallery photo"
          >
            <ChevronLeft className="h-7 w-7 md:h-10 md:w-10" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              navigate(1)
            }}
            className="fixed right-4 top-1/2 z-[9998] flex h-11 min-h-[44px] w-11 min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80 hover:text-gold md:h-14 md:w-14"
            aria-label="Next gallery photo"
          >
            <ChevronRight className="h-7 w-7 md:h-10 md:w-10" />
          </button>
          <img
            src={filtered[lightbox].url}
            alt={getGalleryAlt(filtered[lightbox])}
            className="max-h-full max-w-full object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}
