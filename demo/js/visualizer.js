// ============================================
// Visualizer Logic - Performance charts
// ============================================

(function() {
    'use strict';

    // Sample instruction data for comparison
    const instructionComparisons = [
        { name: 'ADD (register)', firestorm: 1, icestorm: 1 },
        { name: 'MUL', firestorm: 3, icestorm: 3 },
        { name: 'UDIV', firestorm: 12, icestorm: 8 },
        { name: 'LDR', firestorm: 4, icestorm: 4 },
        { name: 'STR', firestorm: 1, icestorm: 1 },
        { name: 'FADD', firestorm: 3, icestorm: 3 },
        { name: 'FMUL', firestorm: 4, icestorm: 4 },
        { name: 'FDIV (S)', firestorm: 7, icestorm: 8 },
        { name: 'FSQRT (S)', firestorm: 7, icestorm: 8 },
        { name: 'B.cond', firestorm: 1, icestorm: 1 }
    ];

    // Initialize
    function init() {
        setupCategoryFilter();
        renderInstructionComparison();
        animateCharts();
    }

    // Category filter
    function setupCategoryFilter() {
        const buttons = document.querySelectorAll('.control-btn[data-category]');
        buttons.forEach(btn => {
            btn.addEventListener('click', function() {
                buttons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                filterByCategory(category);
            });
        });
    }

    function filterByCategory(category) {
        // In a full implementation, this would filter the displayed charts
        console.log(`Filtering by category: ${category}`);
        
        // For demo purposes, we'll just update the instruction comparison
        renderInstructionComparison(category);
    }

    // Render instruction comparison chart
    function renderInstructionComparison(category = 'all') {
        const container = document.getElementById('instructionComparisonChart');
        if (!container) return;

        let data = instructionComparisons;
        
        // Filter by category if needed
        if (category !== 'all') {
            // In a real implementation, we'd filter based on instruction category
            // For now, just use all data
        }

        const maxLatency = Math.max(...data.map(d => Math.max(d.firestorm, d.icestorm)));

        const html = data.map(inst => {
            const firestormWidth = (inst.firestorm / maxLatency) * 100;
            const icestormWidth = (inst.icestorm / maxLatency) * 100;

            return `
                <div class="bar-row" style="margin-bottom: var(--spacing-lg);">
                    <div class="bar-label" style="min-width: 150px;">${inst.name}</div>
                    <div style="display: flex; flex-direction: column; gap: var(--spacing-xs); width: 100%;">
                        <div class="bar-container">
                            <div class="bar firestorm" style="width: ${firestormWidth}%;">
                                ${inst.firestorm} cycle${inst.firestorm !== 1 ? 's' : ''}
                            </div>
                        </div>
                        <div class="bar-container">
                            <div class="bar icestorm" style="width: ${icestormWidth}%;">
                                ${inst.icestorm} cycle${inst.icestorm !== 1 ? 's' : ''}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = html;
        
        // Animate bars
        setTimeout(() => {
            const bars = container.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.opacity = '1';
                    bar.style.transform = 'scaleX(1)';
                }, index * 50);
            });
        }, 100);
    }

    // Animate charts on load
    function animateCharts() {
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.opacity = '0';
            bar.style.transform = 'scaleX(0)';
            bar.style.transformOrigin = 'left';
            bar.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        // Trigger animation with IntersectionObserver
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const bars = entry.target.querySelectorAll('.bar');
                    bars.forEach((bar, barIndex) => {
                        setTimeout(() => {
                            bar.style.opacity = '1';
                            bar.style.transform = 'scaleX(1)';
                        }, barIndex * 100);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.chart-card').forEach(card => {
            observer.observe(card);
        });
    }

    // Export chart data (for future use)
    function exportChartData(format = 'json') {
        const data = {
            architectures: {
                firestorm: {
                    pipelineWidth: 8,
                    executionUnits: 14,
                    robSize: 330,
                    intRegisterFile: 387,
                    inFlightLoads: 130,
                    inFlightStores: 60
                },
                icestorm: {
                    pipelineWidth: 4,
                    executionUnits: 7,
                    robSize: 60,
                    intRegisterFile: 79,
                    inFlightLoads: 30,
                    inFlightStores: 18
                }
            },
            instructionLatencies: instructionComparisons
        };

        if (format === 'json') {
            const dataStr = JSON.stringify(data, null, 2);
            downloadFile('apple-cpu-performance.json', dataStr, 'application/json');
        }
    }

    function downloadFile(filename, content, type) {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Generate performance report
    function generatePerformanceReport() {
        const report = `
# Apple CPU Performance Report

## Architecture Overview

### Firestorm (P-Core)
- Pipeline Width: 8 uops/cycle
- Execution Units: 14 (6 Int + 4 Mem + 4 SIMD)
- ROB Size: ~330 entries
- Integer Register File: ~387 registers
- In-flight Loads: ~130
- In-flight Stores: ~60

### Icestorm (E-Core)
- Pipeline Width: 4 uops/cycle
- Execution Units: 7 (3 Int + 2 Mem + 2 SIMD)
- ROB Size: ~60 entries
- Integer Register File: ~79 registers
- In-flight Loads: ~30
- In-flight Stores: ~18

## Performance Ratios (Firestorm / Icestorm)
- Pipeline Width: 2.0×
- Execution Units: 2.0×
- ROB Size: 5.5×
- Register File: 4.9×
- Load Buffers: 4.3×
- Store Buffers: 3.3×

## Instruction Latency Comparison

${instructionComparisons.map(inst => 
    `- ${inst.name}: ${inst.firestorm}c (Firestorm) / ${inst.icestorm}c (Icestorm)`
).join('\n')}

## Key Insights

1. **Throughput vs Efficiency**: Firestorm optimizes for maximum throughput with 2× the 
   execution resources, while Icestorm focuses on power efficiency.

2. **Out-of-Order Execution**: Firestorm's 5.5× larger ROB enables much deeper speculation,
   crucial for hiding memory latency and exploiting instruction-level parallelism.

3. **Memory Performance**: Firestorm's 4× advantage in load/store buffers makes it 
   significantly better for memory-intensive workloads.

4. **Similar Latencies**: Both cores implement similar instruction latencies, with the 
   main difference being in throughput capabilities rather than individual operation speed.

Generated: ${new Date().toISOString()}
        `.trim();

        return report;
    }

    // Export functions
    window.VisualizerApp = {
        init,
        exportChartData,
        generatePerformanceReport
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
