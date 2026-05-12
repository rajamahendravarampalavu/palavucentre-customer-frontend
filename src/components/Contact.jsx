import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useSiteSettings } from '../context/SiteContext'
import { publicApi } from '../lib/api'
import {
  contactInquiryDefaults,
  contactInquirySchema,
  normalizeContactInquiry,
} from '../lib/contact-form-validation'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [formError, setFormError] = useState('')
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: contactInquiryDefaults,
    resolver: zodResolver(contactInquirySchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })
  const { siteSettings } = useSiteSettings()
  const contact = siteSettings?.contact || {}
  const messageLength = watch('message')?.length || 0

  const registerField = (name) =>
    register(name, {
      onChange: () => {
        clearErrors(name)
      },
    })

  const applyServerErrors = (serverErrors) => {
    Object.entries(serverErrors || {}).forEach(([field, message]) => {
      if (message) {
        setError(field, { type: 'server', message })
      }
    })
  }

  const submitInquiry = async (values) => {
    try {
      setFormError('')
      await publicApi.submitContact(normalizeContactInquiry(values))
      setSubmitted(true)
      reset(contactInquiryDefaults)

      window.setTimeout(() => {
        setSubmitted(false)
      }, 3000)
    } catch (requestError) {
      if (requestError.status === 422 && requestError.payload?.errors) {
        applyServerErrors(requestError.payload.errors)
        return
      }

      setFormError('Something went wrong. Please try again.')
    }
  }

  return (
    <section id="contact" className="py-8 md:py-12 px-4 bg-earth-dark">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-earth-brown/50 p-8 rounded-lg mb-6">
              <h3 className="text-2xl font-bold mb-6 text-turmeric">Get in Touch</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-turmeric mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-300">Phone</p>
                    <a href={`tel:${contact.phone || '9966655997'}`} className="text-turmeric hover:underline">
                      {contact.phone || '9966655997'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-turmeric mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-300">Email</p>
                    <a href={`mailto:${contact.email || 'rajamahendravarampalavu@gmail.com'}`} className="text-turmeric hover:underline break-all">
                      {contact.email || 'rajamahendravarampalavu@gmail.com'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-turmeric mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-300">Hours</p>
                    <p className="text-gray-400">{contact.hours || 'Monday - Sunday, 12:00 PM - 11:00 PM'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-turmeric mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-300">Location</p>
                    <p className="text-gray-400">{contact.address || 'Hyderabad, Telangana'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-earth-brown/50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-6 text-turmeric">Send Us a Message</h3>

            {submitted ? (
              <div className="bg-green-900/50 border border-green-500 text-green-200 p-4 rounded-lg text-center">
                Thank you! We&apos;ll get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit(submitInquiry)} noValidate className="space-y-4">
                {formError && (
                  <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-lg text-center">
                    {formError}
                  </div>
                )}

                <div>
                  <label className="block text-gray-300 mb-2">Name *</label>
                  <input
                    type="text"
                    {...registerField('name')}
                    className={`w-full px-4 py-3 rounded-lg bg-earth-dark border outline-none text-gray-100 ${
                      errors.name ? 'border-red-500 focus:border-red-500' : 'border-turmeric/30 focus:border-turmeric'
                    }`}
                    aria-invalid={errors.name ? 'true' : 'false'}
                  />
                  {errors.name && <p className="mt-2 text-sm text-red-300">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    {...registerField('phone')}
                    className={`w-full px-4 py-3 rounded-lg bg-earth-dark border outline-none text-gray-100 ${
                      errors.phone ? 'border-red-500 focus:border-red-500' : 'border-turmeric/30 focus:border-turmeric'
                    }`}
                    aria-invalid={errors.phone ? 'true' : 'false'}
                  />
                  {errors.phone && <p className="mt-2 text-sm text-red-300">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Email *</label>
                  <input
                    type="email"
                    {...registerField('email')}
                    className={`w-full px-4 py-3 rounded-lg bg-earth-dark border outline-none text-gray-100 ${
                      errors.email ? 'border-red-500 focus:border-red-500' : 'border-turmeric/30 focus:border-turmeric'
                    }`}
                    aria-invalid={errors.email ? 'true' : 'false'}
                  />
                  {errors.email && <p className="mt-2 text-sm text-red-300">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Subject *</label>
                  <input
                    type="text"
                    {...registerField('subject')}
                    className={`w-full px-4 py-3 rounded-lg bg-earth-dark border outline-none text-gray-100 ${
                      errors.subject ? 'border-red-500 focus:border-red-500' : 'border-turmeric/30 focus:border-turmeric'
                    }`}
                    aria-invalid={errors.subject ? 'true' : 'false'}
                  />
                  {errors.subject && <p className="mt-2 text-sm text-red-300">{errors.subject.message}</p>}
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label className="block text-gray-300">Message *</label>
                    <span className="text-xs text-gray-500">{messageLength}/2000</span>
                  </div>
                  <textarea
                    rows="4"
                    maxLength={2000}
                    {...registerField('message')}
                    className={`w-full px-4 py-3 rounded-lg bg-earth-dark border outline-none text-gray-100 resize-none ${
                      errors.message ? 'border-red-500 focus:border-red-500' : 'border-turmeric/30 focus:border-turmeric'
                    }`}
                    aria-invalid={errors.message ? 'true' : 'false'}
                  ></textarea>
                  {errors.message && <p className="mt-2 text-sm text-red-300">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-turmeric text-earth-dark py-4 rounded-full font-bold text-lg hover:bg-yellow-600 transition"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center justify-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-earth-dark/30 border-t-earth-dark" />
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
