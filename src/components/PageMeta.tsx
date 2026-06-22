import { useEffect } from 'react';

interface PageMetaProps {
  title: string;
  description: string;
}

/**
 * Sets the document title and meta description for a page.
 * Simple alternative to react-helmet for this project.
 */
export default function PageMeta({ title, description }: PageMetaProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update standard meta description
    const metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    // Resolve current origin dynamically (supports localhost, Vercel preview, and production)
    const origin = window.location.origin || 'https://nppavalia.com.br';
    const ogImageUrl = `${origin}/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`;

    // Update Open Graph tags
    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    const ogImage = document.querySelector<HTMLMetaElement>('meta[property="og:image"]');
    if (ogImage) ogImage.setAttribute('content', ogImageUrl);

    // Update Twitter tags
    const twitterTitle = document.querySelector<HTMLMetaElement>('meta[property="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', title);

    const twitterDesc = document.querySelector<HTMLMetaElement>('meta[property="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', description);

    const twitterImage = document.querySelector<HTMLMetaElement>('meta[property="twitter:image"]');
    if (twitterImage) twitterImage.setAttribute('content', ogImageUrl);
  }, [title, description]);

  return null;
}
