# Deployment Summary

## Latest deploy summary

-
- Removed Jenn's phone number from the public website so inquiries route through email and the contact form.
- Promoted the approved new layout across the site and removed the old Current/New layout selector path.
- Updated the Inquire form submission payload to match the current lead API contract.
- Prepared GA4 tracking for page views, CTA clicks, portfolio engagement, FAQ interactions, outbound email/social clicks, scroll depth, and lead form activity.
- Restored phone number collection inside the Inquire form while keeping Jenn's public phone number off the site.
- Updated the Inquire form fields to use Mantine UI while preserving the existing form flow and visual style.

## Notes for internal team

-
- Removed the `BUSINESS_INFO.phone` constant, public `tel:` link, phone display formatting helpers, and LocalBusiness schema `telephone` field.
- Removed layout variant query/localStorage plumbing, the old current-layout components, and the layout selector controls from the floating preview widget. Theme preview remains available.
- Contact form proxy still posts to `${PVS_CONTACT_API_URL}/api/v1/contact-forms/${PVS_WEBSITE_SLUG}` and now forwards the submitted client phone number in both the top-level `phone` field and form `data`.
- GA4 is controlled by `NEXT_PUBLIC_GA_MEASUREMENT_ID`; analytics no-op when unset. Automatic GA page views are disabled and route-change page views are sent manually.
- Added Mantine provider/theme setup with `@mantine/core` styles loaded before app globals. Contact form selects use React Hook Form `Controller`; text inputs/textarea continue to use existing Zod validation and analytics behavior.

## Changed URLs

-
- https://ifferspictures.com/
- https://ifferspictures.com/about
- https://ifferspictures.com/services
- https://ifferspictures.com/services/events
- https://ifferspictures.com/services/family
- https://ifferspictures.com/services/maternity
- https://ifferspictures.com/services/couples-engagement
- https://ifferspictures.com/services/portrait
- https://ifferspictures.com/portfolio
- https://ifferspictures.com/testimonials
- https://ifferspictures.com/investment
- https://ifferspictures.com/faq
- https://ifferspictures.com/contact
