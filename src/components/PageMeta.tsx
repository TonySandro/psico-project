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
    document.title = title;
    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
  }, [title, description]);

  return null;
}
