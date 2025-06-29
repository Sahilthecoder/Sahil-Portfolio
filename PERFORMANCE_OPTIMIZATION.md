# Performance Optimization Guide

This document outlines the performance optimizations implemented in the portfolio project and provides instructions for maintaining and extending them.

## Table of Contents

1. [Image Optimization](#image-optimization)
2. [Performance Monitoring](#performance-monitoring)
3. [Error Handling](#error-handling)
4. [Accessibility](#accessibility)
5. [Scripts](#scripts)
6. [Best Practices](#best-practices)

## Image Optimization

### Optimized Image Workflow

1. **Place original images** in `public/images/`
2. **Run the optimization script**:
   ```bash
   npm run optimize-images
   ```
   This will:
   - Create optimized versions in WebP and AVIF formats
   - Generate responsive sizes (1x, 2x, 3x)
   - Save them to `public/optimized-images/`

3. **Update image references** in your components:
   ```bash
   npm run update-image-references
   ```
   This will:
   - Scan your React components for image imports
   - Replace them with optimized `<picture>` elements
   - Add proper loading and decoding attributes

### Image Components

Use the `ResponsiveImage` component for consistent image handling:

```jsx
import ResponsiveImage from './components/media/ResponsiveImage';

function MyComponent() {
  return (
    <ResponsiveImage
      src="/images/example.jpg"
      alt="Description of the image"
      width={800}
      height={600}
      loading="lazy"
      className="my-image"
      placeholder={{
        backgroundColor: '#f3f4f6',
        text: 'Loading image...',
        textColor: '#6b7280'
      }}
    />
  );
}
```

## Performance Monitoring

### Performance Monitor

The `PerformanceMonitor` component provides real-time metrics in development:

```jsx
import { PerformanceMonitor } from './components/performance/PerformanceMonitor';

function App() {
  return (
    <>
      {/* Your app content */}
      <PerformanceMonitor 
        showOnLoad={false}
        position="bottom-right"
        theme="dark"
      />
    </>
  );
}
```

### Core Web Vitals

Key metrics are tracked automatically:
- **CLS** (Cumulative Layout Shift)
- **FID** (First Input Delay)
- **LCP** (Largest Contentful Paint)
- **FCP** (First Contentful Paint)
- **INP** (Interaction to Next Paint)

## Error Handling

### Error Boundary

Wrap your app with the `ErrorBoundary` component:

```jsx
import { ErrorBoundary } from './components/error/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary 
      showDebugInfo={process.env.NODE_ENV !== 'production'}
      onError={(error, errorInfo) => {
        // Log to error reporting service
        console.error('Error caught by boundary:', error, errorInfo);
      }}
    >
      {/* Your app content */}
    </ErrorBoundary>
  );
}
```

## Accessibility

### Semantic Components

Use semantic components for better accessibility:

```jsx
import { SemanticHeading, Section, Article, Nav } from './components/accessibility/SemanticHeadings';
import { AccessibleButton } from './components/accessibility/AccessibleButton';
import { AccessibleLink } from './components/accessibility/AccessibleLink';

function MyComponent() {
  return (
    <Article title="Article Title">
      <SemanticHeading level={1}>Main Heading</SemanticHeading>
      <p>Article content goes here.</p>
      
      <Section title="Section Title" level={2}>
        <p>Section content.</p>
        
        <Nav label="Main Navigation">
          <AccessibleLink href="/about">About</AccessibleLink>
          <AccessibleLink href="/contact" external>Contact (external)</AccessibleLink>
        </Nav>
        
        <AccessibleButton 
          onClick={() => console.log('Button clicked')}
          aria-label="Action button"
        >
          Click Me
        </AccessibleButton>
      </Section>
    </Article>
  );
}
```

## Scripts

### Available Scripts

- `npm run analyze-images` - Analyze images and suggest optimizations
- `npm run optimize-images` - Optimize images (requires Sharp)
- `npm run update-image-references` - Update image references in components
- `npm run build` - Build the production bundle
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Dependencies

- `sharp` - For image optimization
- `glob` - For file pattern matching
- `chalk` - For colored console output
- `cli-table3` - For formatted tables in the console
- `ora` - For spinner animations

## Best Practices

### Image Optimization

1. **Use modern formats**: Prefer WebP or AVIF over JPEG/PNG
2. **Specify dimensions**: Always include width and height to prevent layout shifts
3. **Lazy load**: Use `loading="lazy"` for below-the-fold images
4. **Responsive images**: Use `srcset` for different screen densities
5. **Optimize delivery**: Consider using a CDN for image delivery

### Performance

1. **Code splitting**: Use React.lazy() for route-based code splitting
2. **Resource hints**: Add preload/prefetch for critical resources
3. **Font loading**: Use `font-display: swap` for better font loading
4. **Minify and compress**: Ensure your build process minifies and compresses assets
5. **Cache strategy**: Implement proper cache headers and service worker caching

### Accessibility

1. **Semantic HTML**: Use appropriate HTML elements
2. **ARIA attributes**: Add ARIA attributes when needed
3. **Keyboard navigation**: Ensure all interactive elements are keyboard accessible
4. **Color contrast**: Maintain sufficient contrast ratios
5. **Screen reader testing**: Test with screen readers

## Troubleshooting

### Image Optimization Issues

- **Missing optimized images**: Run `npm run optimize-images` first
- **Broken image references**: Check paths in `public/optimized-images/`
- **Slow optimization**: Reduce the number of sizes or use smaller source images

### Performance Issues

- **High CLS**: Ensure images have explicit dimensions
- **Slow LCP**: Optimize above-the-fold images and preload critical resources
- **High TBT**: Reduce JavaScript execution time and break up long tasks

## License

This project is open source and available under the [MIT License](LICENSE).
