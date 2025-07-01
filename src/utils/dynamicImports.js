import { lazy } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';

// Lazy load TensorFlow.js
const loadTensorFlow = async () => {
  try {
    const tf = await import('@tensorflow/tfjs');
    return tf;
  } catch (error) {
    console.error('Error loading TensorFlow.js:', error);
    throw error;
  }
};

// Lazy load PDF generation libraries
const loadPdfLibraries = async () => {
  try {
    const [html2canvas, jsPDF] = await Promise.all([
      import('html2canvas'),
      import('jspdf')
    ]);
    return { html2canvas, jsPDF };
  } catch (error) {
    console.error('Error loading PDF libraries:', error);
    throw error;
  }
};

// Lazy load AI-related libraries
const loadAILibraries = async () => {
  try {
    const [langchain, openai, pinecone] = await Promise.all([
      import('@langchain/core'),
      import('@langchain/openai'),
      import('@pinecone-database/pinecone')
    ]);
    return { langchain, openai, pinecone };
  } catch (error) {
    console.error('Error loading AI libraries:', error);
    throw error;
  }
};

// Higher-order component for lazy loading
const withLazyLoader = (importFn, LoadingComponent = null) => {
  const LazyComponent = lazy(async () => {
    try {
      await importFn();
      return { default: () => null };
    } catch (error) {
      return { default: () => <ErrorBoundary error={error} /> };
    }
  });

  return function LazyLoader(props) {
    return (
      <ErrorBoundary>
        <Suspense fallback={LoadingComponent || <div>Loading...</div>}>
          <LazyComponent {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  };
};

export {
  loadTensorFlow,
  loadPdfLibraries,
  loadAILibraries,
  withLazyLoader
};
