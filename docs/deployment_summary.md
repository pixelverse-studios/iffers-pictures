# Deployment Summary

## Latest deploy summary

- Finalized site theme to **Morning Dew** color palette — soft periwinkle blue, warm sand tones, and cool morning white
- Set typography to **Josefin Slab** for headings and **Nunito** for body text
- Removed the theme/font preview widget from the bottom of the page
- Added a new **FAQ page** with 8 general questions and links to service-specific FAQs
- Added FAQ link to the main navigation (desktop and mobile)
- Added Resources section to the website footer with FAQ and Service Areas links

## Notes for internal team

- Deleted ThemeSwitcher.tsx component entirely
- Morning Dew palette values baked into globals.css :root and @theme
- Font override mechanism removed — fonts now loaded directly via next/font/google
- All 15 palette options and 19 font options removed (no longer needed)
- DEV-461: Created /faq route with FAQPage schema, BreadcrumbList schema, SEO metadata
- FAQ added to NAV_LINKS, NAV_LINKS_RIGHT, FOOTER_LINKS.resources rendered in Footer
- /faq added to sitemap.ts

## Changed URLs

- https://ifferspictures.com/
- https://ifferspictures.com/about
- https://ifferspictures.com/services
- https://ifferspictures.com/portfolio
- https://ifferspictures.com/contact
- https://ifferspictures.com/faq
