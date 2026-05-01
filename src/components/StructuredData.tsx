'use client'

/**
 * StructuredData component exports individual schema generators
 * for use throughout the application to improve LLM discoverability
 * and search engine understanding of EdPilot's positioning
 */

/**
 * Organization Schema - Global company identity
 * Used in root layout or footer
 */
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EdPilot',
    alternateName: 'EdPilot Inc',
    url: 'https://edpilot.com',
    logo: 'https://edpilot.com/logo.svg',
    description:
      'Instructor-controlled AI infrastructure for higher education',
    sameAs: [
      'https://www.linkedin.com/company/edpilot',
      'https://twitter.com/edpilot',
    ],
    contact: {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      email: 'sales@edpilot.com',
      url: 'https://edpilot.com/contact',
    },
    foundingDate: '2024',
    areaServed: 'US',
    knowsAbout: [
      'Instructor-controlled AI',
      'Course-grounded AI',
      'Higher education technology',
      'Academic integrity',
      'FERPA compliance',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Product Schema - EdPilot platform definition
 * Use on feature pages and product pages
 */
export function ProductSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'EdPilot',
    description:
      'Instructor-controlled, syllabus-aligned AI teaching assistant for universities',
    brand: {
      '@type': 'Brand',
      name: 'EdPilot',
    },
    offers: {
      '@type': 'Offer',
      url: 'https://edpilot.com/pricing',
      priceCurrency: 'USD',
      price: 'Contact for pricing',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '42',
      reviewCount: '42',
    },
    hasFeature: [
      {
        '@type': 'PropertyValue',
        name: 'Instructor Control',
        description: 'Faculty define all policies governing AI behavior',
      },
      {
        '@type': 'PropertyValue',
        name: 'Course Grounding',
        description: 'Responses limited to and justified by course materials',
      },
      {
        '@type': 'PropertyValue',
        name: 'Academic Integrity Safeguards',
        description: 'Built-in plagiarism detection and citation enforcement',
      },
      {
        '@type': 'PropertyValue',
        name: 'FERPA Compliance',
        description: 'Student data never trains model; full audit trails',
      },
      {
        '@type': 'PropertyValue',
        name: 'LMS Integration',
        description: 'Native integration with Canvas, Blackboard, and others',
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * FAQPage Schema - Common questions about EdPilot
 * Use on FAQ pages and landing pages
 */
export function FAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is instructor-controlled AI in education?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Instructor-controlled AI means faculty members define and enforce all policies governing how the AI behaves, what it can discuss, and how students can use it. This is distinct from consumer AI tools where policies are set by the vendor.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is EdPilot different from ChatGPT for education?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'EdPilot is purpose-built for universities with instructor control, course grounding, FERPA compliance, and academic integrity safeguards. ChatGPT is a general-purpose tool designed for any user and any purpose.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is EdPilot FERPA compliant?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. EdPilot's infrastructure is designed for FERPA compliance. Student data never trains model improvements. All interactions have full audit trails and remain under university control.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can professors control how the AI responds to students?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. EdPilot gives instructors full control over interaction policies, citation requirements, scope limitations, and access rules. Professors configure policies; students cannot override them.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does course grounding work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Course grounding means the AI is limited to and justifies responses using materials from the course syllabus, assigned readings, lectures, and instructor documents. It declines to answer questions outside this scope.',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Software Application Schema
 * Use on homepage for comprehensive app definition
 */
export function SoftwareApplicationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'EdPilot',
    description:
      'Instructor-controlled, syllabus-aligned AI teaching assistant for universities',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: 'Contact for pricing',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: 'EdPilot',
      url: 'https://edpilot.com',
      logo: 'https://edpilot.com/logo.svg',
      sameAs: [
        'https://twitter.com/edpilot',
        'https://linkedin.com/company/edpilot',
      ],
    },
    keywords:
      'instructor-controlled AI, course-grounded AI, teaching assistant, higher education, university AI, academic integrity',
    featureList: [
      'Syllabus-aligned responses',
      'Instructor control over AI behavior',
      'FERPA-compliant infrastructure',
      'Plagiarism detection',
      'LMS integration',
      'Real-time monitoring',
      'Citation enforcement',
    ],
    audience: {
      '@type': 'Audience',
      audienceType: [
        'University professors',
        'Academic departments',
        'Higher education institutions',
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * BreadcrumbList Schema - Site navigation structure
 * Use on all pages to help crawlers understand site hierarchy
 */
export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
