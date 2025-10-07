import { useEffect } from "react";

const PerformanceMonitor: React.FC = () => {
  useEffect(() => {
    // Core Web Vitals monitoring
    const measureWebVitals = () => {
      // Largest Contentful Paint (LCP)
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];

        // Send to analytics if LCP > 2.5s
        if (lastEntry.startTime > 2500) {
          console.warn("Poor LCP detected:", lastEntry.startTime);
        }
      }).observe({ entryTypes: ["largest-contentful-paint"] });

      // First Input Delay (FID)
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          console.log("FID:", entry.processingStart - entry.startTime);

          // Send to analytics if FID > 100ms
          if (entry.processingStart - entry.startTime > 100) {
            console.warn(
              "Poor FID detected:",
              entry.processingStart - entry.startTime
            );
          }
        });
      }).observe({ entryTypes: ["first-input"] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });

        // Send to analytics if CLS > 0.1
        if (clsValue > 0.1) {
          console.warn("Poor CLS detected:", clsValue);
        }
      }).observe({ entryTypes: ["layout-shift"] });

      // First Contentful Paint (FCP)
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          // Send to analytics if FCP > 1.8s
          if (entry.startTime > 1800) {
            console.warn("Poor FCP detected:", entry.startTime);
          }
        });
      }).observe({ entryTypes: ["paint"] });
    };

    // Resource loading monitoring
    const measureResourceLoading = () => {
      window.addEventListener("load", () => {
        const navigation = performance.getEntriesByType(
          "navigation"
        )[0] as PerformanceNavigationTiming;
        const resources = performance.getEntriesByType("resource");

        // Check for slow resources
        resources.forEach((resource: any) => {
          if (resource.duration > 1000) {
            console.warn(
              "Slow resource detected:",
              resource.name,
              resource.duration
            );
          }
        });
      });
    };

    // Memory usage monitoring
    const measureMemoryUsage = () => {
      if ("memory" in performance) {
        const memory = (performance as any).memory;

        // Warn if memory usage is high
        if (memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.8) {
          console.warn("High memory usage detected");
        }
      }
    };

    // Initialize monitoring
    measureWebVitals();
    measureResourceLoading();
    measureMemoryUsage();

    // Periodic memory check
    const memoryInterval = setInterval(measureMemoryUsage, 30000);

    return () => {
      clearInterval(memoryInterval);
    };
  }, []);

  return null;
};

export default PerformanceMonitor;
