// ============================================
// Data Parser - Extract instruction data from HTML files
// ============================================

(function() {
    'use strict';

    // Sample instruction data (in a real implementation, this would parse the existing HTML files)
    // For this demo, we'll create a comprehensive sample dataset
    const instructionData = {
        firestorm: [
            { name: 'ADD (register)', category: 'integer', latency: 1, throughput: 0.167, uops: 1, int: 1, mem: 0, fp: 0, units: 'u1-6' },
            { name: 'ADD (immediate)', category: 'integer', latency: 1, throughput: 0.167, uops: 1, int: 1, mem: 0, fp: 0, units: 'u1-6' },
            { name: 'ADD (shift)', category: 'integer', latency: 2, throughput: 0.333, uops: 1, int: 2, mem: 0, fp: 0, units: '2*u1-6' },
            { name: 'ADDS', category: 'integer', latency: 1, throughput: 0.333, uops: 1, int: 1, mem: 0, fp: 0, units: 'u1-3' },
            { name: 'SUB (register)', category: 'integer', latency: 1, throughput: 0.167, uops: 1, int: 1, mem: 0, fp: 0, units: 'u1-6' },
            { name: 'MUL', category: 'integer', latency: 3, throughput: 0.5, uops: 1, int: 1, mem: 0, fp: 0, units: 'u5-6' },
            { name: 'MADD', category: 'integer', latency: 3, throughput: 0.5, uops: 1, int: 1, mem: 0, fp: 0, units: 'u5-6' },
            { name: 'UDIV', category: 'integer', latency: 12, throughput: 12, uops: 1, int: 1, mem: 0, fp: 0, units: 'u5' },
            { name: 'SDIV', category: 'integer', latency: 12, throughput: 12, uops: 1, int: 1, mem: 0, fp: 0, units: 'u5' },
            { name: 'AND (register)', category: 'integer', latency: 1, throughput: 0.167, uops: 1, int: 1, mem: 0, fp: 0, units: 'u1-6' },
            { name: 'ORR (register)', category: 'integer', latency: 1, throughput: 0.167, uops: 1, int: 1, mem: 0, fp: 0, units: 'u1-6' },
            { name: 'EOR (register)', category: 'integer', latency: 1, throughput: 0.167, uops: 1, int: 1, mem: 0, fp: 0, units: 'u1-6' },
            { name: 'LSL (immediate)', category: 'integer', latency: 1, throughput: 0.167, uops: 1, int: 1, mem: 0, fp: 0, units: 'u1-6' },
            { name: 'LSR (immediate)', category: 'integer', latency: 1, throughput: 0.167, uops: 1, int: 1, mem: 0, fp: 0, units: 'u1-6' },
            { name: 'MOV (register)', category: 'integer', latency: 0, throughput: 0, uops: 1, int: 0, mem: 0, fp: 0, units: 'eliminated' },
            { name: 'LDR (immediate)', category: 'load-store', latency: 4, throughput: 0.25, uops: 1, int: 0, mem: 1, fp: 0, units: 'u8-10' },
            { name: 'LDP', category: 'load-store', latency: 4, throughput: 0.5, uops: 1, int: 0, mem: 2, fp: 0, units: 'u8-10' },
            { name: 'STR (immediate)', category: 'load-store', latency: 1, throughput: 0.5, uops: 1, int: 0, mem: 1, fp: 0, units: 'u7-8' },
            { name: 'STP', category: 'load-store', latency: 1, throughput: 0.5, uops: 1, int: 0, mem: 2, fp: 0, units: 'u7-8' },
            { name: 'B', category: 'branch', latency: 0, throughput: 0, uops: 1, int: 0, mem: 0, fp: 0, units: 'eliminated' },
            { name: 'B.cond', category: 'branch', latency: 1, throughput: 1, uops: 1, int: 1, mem: 0, fp: 0, units: 'u1-2' },
            { name: 'CBZ', category: 'branch', latency: 1, throughput: 1, uops: 1, int: 1, mem: 0, fp: 0, units: 'u1-2' },
            { name: 'BR', category: 'branch', latency: 1, throughput: 1, uops: 1, int: 1, mem: 0, fp: 0, units: 'u2' },
            { name: 'FADD (scalar)', category: 'simd', latency: 3, throughput: 0.5, uops: 1, int: 0, mem: 0, fp: 1, units: 'u11-14' },
            { name: 'FADD (vector)', category: 'simd', latency: 3, throughput: 0.5, uops: 1, int: 0, mem: 0, fp: 1, units: 'u11-14' },
            { name: 'FMUL (scalar)', category: 'simd', latency: 4, throughput: 0.5, uops: 1, int: 0, mem: 0, fp: 1, units: 'u11-14' },
            { name: 'FMADD', category: 'simd', latency: 4, throughput: 0.5, uops: 1, int: 0, mem: 0, fp: 1, units: 'u11-14' },
            { name: 'FDIV (scalar S)', category: 'simd', latency: 7, throughput: 3.5, uops: 1, int: 0, mem: 0, fp: 1, units: 'u14' },
            { name: 'FSQRT (scalar S)', category: 'simd', latency: 7, throughput: 3.5, uops: 1, int: 0, mem: 0, fp: 1, units: 'u14' },
            { name: 'ADD (vector)', category: 'simd', latency: 2, throughput: 0.5, uops: 1, int: 0, mem: 0, fp: 1, units: 'u11-14' },
            { name: 'MUL (vector)', category: 'simd', latency: 4, throughput: 0.5, uops: 1, int: 0, mem: 0, fp: 1, units: 'u11-14' },
            { name: 'ADDV', category: 'simd', latency: 6, throughput: 2, uops: 1, int: 0, mem: 0, fp: 1, units: 'u11-14' },
            { name: 'ZIP1', category: 'simd', latency: 2, throughput: 0.5, uops: 1, int: 0, mem: 0, fp: 1, units: 'u11-14' },
            { name: 'UZP1', category: 'simd', latency: 2, throughput: 0.5, uops: 1, int: 0, mem: 0, fp: 1, units: 'u11-14' },
            { name: 'TBL (1 reg)', category: 'simd', latency: 3, throughput: 0.5, uops: 1, int: 0, mem: 0, fp: 1, units: 'u11-14' },
            { name: 'REV64', category: 'simd', latency: 2, throughput: 0.5, uops: 1, int: 0, mem: 0, fp: 1, units: 'u11-14' },
            { name: 'SHA256H', category: 'simd', latency: 4, throughput: 2, uops: 1, int: 0, mem: 0, fp: 1, units: 'u14' },
            { name: 'AES encrypt', category: 'simd', latency: 3, throughput: 0.5, uops: 2, int: 0, mem: 0, fp: 2, units: 'u11-14' }
        ],
        icestorm: [
            { name: 'ADD (register)', category: 'integer', latency: 1, throughput: 0.333, uops: 1, int: 1, mem: 0, fp: 0, units: 'u1-3' },
            { name: 'ADD (immediate)', category: 'integer', latency: 1, throughput: 0.333, uops: 1, int: 1, mem: 0, fp: 0, units: 'u1-3' },
            { name: 'ADD (shift)', category: 'integer', latency: 2, throughput: 1, uops: 1, int: 2, mem: 0, fp: 0, units: '2*u1-3' },
            { name: 'ADDS', category: 'integer', latency: 1, throughput: 0.333, uops: 1, int: 1, mem: 0, fp: 0, units: 'u1-3' },
            { name: 'SUB (register)', category: 'integer', latency: 1, throughput: 0.333, uops: 1, int: 1, mem: 0, fp: 0, units: 'u1-3' },
            { name: 'MUL', category: 'integer', latency: 3, throughput: 1, uops: 1, int: 1, mem: 0, fp: 0, units: 'u3' },
            { name: 'MADD', category: 'integer', latency: 3, throughput: 1, uops: 1, int: 1, mem: 0, fp: 0, units: 'u3' },
            { name: 'UDIV', category: 'integer', latency: 8, throughput: 8, uops: 1, int: 1, mem: 0, fp: 0, units: 'u2' },
            { name: 'SDIV', category: 'integer', latency: 8, throughput: 8, uops: 1, int: 1, mem: 0, fp: 0, units: 'u2' },
            { name: 'AND (register)', category: 'integer', latency: 1, throughput: 0.333, uops: 1, int: 1, mem: 0, fp: 0, units: 'u1-3' },
            { name: 'ORR (register)', category: 'integer', latency: 1, throughput: 0.333, uops: 1, int: 1, mem: 0, fp: 0, units: 'u1-3' },
            { name: 'EOR (register)', category: 'integer', latency: 1, throughput: 0.333, uops: 1, int: 1, mem: 0, fp: 0, units: 'u1-3' },
            { name: 'LSL (immediate)', category: 'integer', latency: 1, throughput: 0.333, uops: 1, int: 1, mem: 0, fp: 0, units: 'u1-3' },
            { name: 'LSR (immediate)', category: 'integer', latency: 1, throughput: 0.333, uops: 1, int: 1, mem: 0, fp: 0, units: 'u1-3' },
            { name: 'MOV (register)', category: 'integer', latency: 0, throughput: 0, uops: 1, int: 0, mem: 0, fp: 0, units: 'eliminated' },
            { name: 'LDR (immediate)', category: 'load-store', latency: 4, throughput: 0.5, uops: 1, int: 0, mem: 1, fp: 0, units: 'u4-5' },
            { name: 'LDP', category: 'load-store', latency: 4, throughput: 1, uops: 1, int: 0, mem: 2, fp: 0, units: 'u4-5' },
            { name: 'STR (immediate)', category: 'load-store', latency: 1, throughput: 1, uops: 1, int: 0, mem: 1, fp: 0, units: 'u4' },
            { name: 'STP', category: 'load-store', latency: 1, throughput: 1, uops: 1, int: 0, mem: 2, fp: 0, units: 'u4' },
            { name: 'B', category: 'branch', latency: 0, throughput: 0, uops: 1, int: 0, mem: 0, fp: 0, units: 'eliminated' },
            { name: 'B.cond', category: 'branch', latency: 1, throughput: 1, uops: 1, int: 1, mem: 0, fp: 0, units: 'u1-2' },
            { name: 'CBZ', category: 'branch', latency: 1, throughput: 1, uops: 1, int: 1, mem: 0, fp: 0, units: 'u1-2' },
            { name: 'BR', category: 'branch', latency: 1, throughput: 1, uops: 1, int: 1, mem: 0, fp: 0, units: 'u2' },
            { name: 'FADD (scalar)', category: 'simd', latency: 3, throughput: 1, uops: 1, int: 0, mem: 0, fp: 1, units: 'u6-7' },
            { name: 'FADD (vector)', category: 'simd', latency: 3, throughput: 1, uops: 1, int: 0, mem: 0, fp: 1, units: 'u6-7' },
            { name: 'FMUL (scalar)', category: 'simd', latency: 4, throughput: 1, uops: 1, int: 0, mem: 0, fp: 1, units: 'u6-7' },
            { name: 'FMADD', category: 'simd', latency: 4, throughput: 1, uops: 1, int: 0, mem: 0, fp: 1, units: 'u6-7' },
            { name: 'FDIV (scalar S)', category: 'simd', latency: 8, throughput: 4, uops: 1, int: 0, mem: 0, fp: 1, units: 'u7' },
            { name: 'FSQRT (scalar S)', category: 'simd', latency: 8, throughput: 4, uops: 1, int: 0, mem: 0, fp: 1, units: 'u7' },
            { name: 'ADD (vector)', category: 'simd', latency: 2, throughput: 1, uops: 1, int: 0, mem: 0, fp: 1, units: 'u6-7' },
            { name: 'MUL (vector)', category: 'simd', latency: 4, throughput: 1, uops: 1, int: 0, mem: 0, fp: 1, units: 'u6-7' },
            { name: 'ADDV', category: 'simd', latency: 6, throughput: 2, uops: 1, int: 0, mem: 0, fp: 1, units: 'u6-7' },
            { name: 'ZIP1', category: 'simd', latency: 2, throughput: 1, uops: 1, int: 0, mem: 0, fp: 1, units: 'u6-7' },
            { name: 'UZP1', category: 'simd', latency: 2, throughput: 1, uops: 1, int: 0, mem: 0, fp: 1, units: 'u6-7' },
            { name: 'TBL (1 reg)', category: 'simd', latency: 3, throughput: 1, uops: 1, int: 0, mem: 0, fp: 1, units: 'u6-7' },
            { name: 'REV64', category: 'simd', latency: 2, throughput: 1, uops: 1, int: 0, mem: 0, fp: 1, units: 'u6-7' },
            { name: 'SHA256H', category: 'simd', latency: 4, throughput: 2, uops: 1, int: 0, mem: 0, fp: 1, units: 'u7' },
            { name: 'AES encrypt', category: 'simd', latency: 3, throughput: 1, uops: 2, int: 0, mem: 0, fp: 2, units: 'u6-7' }
        ]
    };

    // Export data parsing functions
    window.InstructionData = {
        getAll: function() {
            return instructionData;
        },

        getByArchitecture: function(arch) {
            return instructionData[arch] || [];
        },

        search: function(query, filters = {}) {
            let results = { firestorm: [], icestorm: [] };
            
            // Apply architecture filter
            const architectures = filters.architecture === 'all' || !filters.architecture 
                ? ['firestorm', 'icestorm']
                : [filters.architecture];

            architectures.forEach(arch => {
                let data = instructionData[arch] || [];
                
                // Search by name
                if (query) {
                    const searchLower = query.toLowerCase();
                    data = data.filter(inst => 
                        inst.name.toLowerCase().includes(searchLower)
                    );
                }

                // Filter by category
                if (filters.category && filters.category !== 'all') {
                    data = data.filter(inst => inst.category === filters.category);
                }

                // Filter by performance
                if (filters.performance && filters.performance !== 'all') {
                    data = data.filter(inst => {
                        const lat = inst.latency;
                        switch (filters.performance) {
                            case 'excellent': return lat <= 1;
                            case 'good': return lat >= 2 && lat <= 3;
                            case 'moderate': return lat >= 4 && lat <= 10;
                            case 'slow': return lat > 10;
                            default: return true;
                        }
                    });
                }

                results[arch] = data;
            });

            return results;
        },

        getPerformanceClass: function(latency) {
            if (latency <= 1) return 'excellent';
            if (latency <= 3) return 'good';
            if (latency <= 10) return 'moderate';
            return 'slow';
        },

        getStats: function(arch) {
            const data = instructionData[arch] || [];
            return {
                total: data.length,
                integer: data.filter(i => i.category === 'integer').length,
                simd: data.filter(i => i.category === 'simd').length,
                loadStore: data.filter(i => i.category === 'load-store').length,
                branch: data.filter(i => i.category === 'branch').length,
                avgLatency: (data.reduce((sum, i) => sum + i.latency, 0) / data.length).toFixed(2),
                avgThroughput: (data.reduce((sum, i) => sum + i.throughput, 0) / data.length).toFixed(2)
            };
        }
    };

})();
