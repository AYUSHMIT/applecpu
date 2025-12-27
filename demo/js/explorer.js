// ============================================
// Explorer Logic - Instruction search and display
// ============================================

(function() {
    'use strict';

    // State
    const state = {
        searchQuery: '',
        filters: {
            architecture: 'all',
            category: 'all',
            performance: 'all'
        },
        viewMode: 'table',
        sortColumn: 'name',
        sortDirection: 'asc',
        currentResults: null
    };

    // DOM Elements
    const elements = {
        searchInput: document.getElementById('searchInput'),
        archFilter: document.getElementById('archFilter'),
        categoryFilter: document.getElementById('categoryFilter'),
        perfFilter: document.getElementById('perfFilter'),
        viewMode: document.getElementById('viewMode'),
        resultsCount: document.getElementById('resultsCount'),
        container: document.getElementById('instructionsContainer')
    };

    // Initialize
    function init() {
        setupEventListeners();
        performSearch();
    }

    // Event Listeners
    function setupEventListeners() {
        if (elements.searchInput) {
            elements.searchInput.addEventListener('input', debounce(handleSearch, 300));
        }

        if (elements.archFilter) {
            elements.archFilter.addEventListener('change', handleFilterChange);
        }

        if (elements.categoryFilter) {
            elements.categoryFilter.addEventListener('change', handleFilterChange);
        }

        if (elements.perfFilter) {
            elements.perfFilter.addEventListener('change', handleFilterChange);
        }

        if (elements.viewMode) {
            elements.viewMode.addEventListener('change', handleViewModeChange);
        }
    }

    // Handlers
    function handleSearch(e) {
        state.searchQuery = e.target.value;
        performSearch();
    }

    function handleFilterChange(e) {
        const filterId = e.target.id;
        if (filterId === 'archFilter') {
            state.filters.architecture = e.target.value;
        } else if (filterId === 'categoryFilter') {
            state.filters.category = e.target.value;
        } else if (filterId === 'perfFilter') {
            state.filters.performance = e.target.value;
        }
        performSearch();
    }

    function handleViewModeChange(e) {
        state.viewMode = e.target.value;
        renderResults();
    }

    function handleSort(column) {
        if (state.sortColumn === column) {
            state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            state.sortColumn = column;
            state.sortDirection = 'asc';
        }
        renderResults();
    }

    // Search and Filter
    function performSearch() {
        if (!window.InstructionData) {
            console.error('InstructionData not loaded');
            return;
        }

        state.currentResults = window.InstructionData.search(state.searchQuery, state.filters);
        renderResults();
    }

    // Rendering
    function renderResults() {
        if (!state.currentResults) {
            return;
        }

        const totalCount = getTotalResultCount();
        updateResultsCount(totalCount);

        if (totalCount === 0) {
            renderEmptyState();
        } else if (state.viewMode === 'comparison') {
            renderComparisonView();
        } else {
            renderTableView();
        }
    }

    function getTotalResultCount() {
        if (!state.currentResults) return 0;
        return (state.currentResults.firestorm?.length || 0) + 
               (state.currentResults.icestorm?.length || 0);
    }

    function updateResultsCount(count) {
        if (elements.resultsCount) {
            const archText = state.filters.architecture === 'all' 
                ? 'both architectures' 
                : state.filters.architecture === 'firestorm'
                ? 'Firestorm'
                : 'Icestorm';
            
            elements.resultsCount.textContent = `Found ${count} instruction${count !== 1 ? 's' : ''} in ${archText}`;
        }
    }

    function renderTableView() {
        const data = getCombinedData();
        const sortedData = sortData(data);

        const html = `
            <div class="instructions-table">
                <table>
                    <thead>
                        <tr>
                            <th onclick="window.ExplorerApp.handleSort('name')" class="${getSortClass('name')}">
                                Instruction
                            </th>
                            <th onclick="window.ExplorerApp.handleSort('architecture')" class="${getSortClass('architecture')}">
                                Architecture
                            </th>
                            <th onclick="window.ExplorerApp.handleSort('category')" class="${getSortClass('category')}">
                                Category
                            </th>
                            <th onclick="window.ExplorerApp.handleSort('latency')" class="${getSortClass('latency')}">
                                Latency (cycles)
                            </th>
                            <th onclick="window.ExplorerApp.handleSort('throughput')" class="${getSortClass('throughput')}">
                                Throughput
                            </th>
                            <th onclick="window.ExplorerApp.handleSort('uops')" class="${getSortClass('uops')}">
                                Uops
                            </th>
                            <th>Units</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${sortedData.map(inst => renderTableRow(inst)).join('')}
                    </tbody>
                </table>
            </div>
        `;

        elements.container.innerHTML = html;
    }

    function renderTableRow(inst) {
        const perfClass = window.InstructionData.getPerformanceClass(inst.latency);
        const archBadge = inst.architecture === 'firestorm' 
            ? '<span style="color: var(--firestorm-primary);">🔥 Firestorm</span>'
            : '<span style="color: var(--icestorm-primary);">❄️ Icestorm</span>';

        return `
            <tr>
                <td><span class="instruction-name">${escapeHtml(inst.name)}</span></td>
                <td>${archBadge}</td>
                <td style="text-transform: capitalize;">${escapeHtml(inst.category)}</td>
                <td>
                    <span class="performance-badge perf-${perfClass}">
                        ${inst.latency} cycle${inst.latency !== 1 ? 's' : ''}
                    </span>
                </td>
                <td>${inst.throughput.toFixed(3)}</td>
                <td>${inst.uops}</td>
                <td><code style="font-size: 0.875rem;">${escapeHtml(inst.units)}</code></td>
            </tr>
        `;
    }

    function renderComparisonView() {
        const html = `
            <div class="comparison-view">
                <div class="arch-column">
                    <div class="arch-column-header firestorm">
                        🔥 Firestorm (P-Core)
                    </div>
                    <div style="padding: var(--spacing-lg);">
                        ${renderArchitectureTable(state.currentResults.firestorm, 'firestorm')}
                    </div>
                </div>
                <div class="arch-column">
                    <div class="arch-column-header icestorm">
                        ❄️ Icestorm (E-Core)
                    </div>
                    <div style="padding: var(--spacing-lg);">
                        ${renderArchitectureTable(state.currentResults.icestorm, 'icestorm')}
                    </div>
                </div>
            </div>
        `;

        elements.container.innerHTML = html;
    }

    function renderArchitectureTable(data, arch) {
        if (!data || data.length === 0) {
            return '<p style="text-align: center; color: var(--text-secondary); padding: var(--spacing-xl);">No instructions found</p>';
        }

        return `
            <table style="width: 100%;">
                <thead style="background: var(--bg-secondary);">
                    <tr>
                        <th style="padding: var(--spacing-sm); text-align: left;">Instruction</th>
                        <th style="padding: var(--spacing-sm); text-align: left;">Latency</th>
                        <th style="padding: var(--spacing-sm); text-align: left;">Throughput</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(inst => `
                        <tr>
                            <td style="padding: var(--spacing-sm);">
                                <span class="instruction-name">${escapeHtml(inst.name)}</span>
                            </td>
                            <td style="padding: var(--spacing-sm);">
                                ${inst.latency}c
                            </td>
                            <td style="padding: var(--spacing-sm);">
                                ${inst.throughput.toFixed(3)}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    function renderEmptyState() {
        const html = `
            <div class="empty-state">
                <div class="empty-state-icon">🔍</div>
                <h3>No instructions found</h3>
                <p>Try adjusting your search query or filters</p>
            </div>
        `;
        elements.container.innerHTML = html;
    }

    // Data Processing
    function getCombinedData() {
        const combined = [];
        
        if (state.filters.architecture === 'all' || state.filters.architecture === 'firestorm') {
            state.currentResults.firestorm?.forEach(inst => {
                combined.push({ ...inst, architecture: 'firestorm' });
            });
        }
        
        if (state.filters.architecture === 'all' || state.filters.architecture === 'icestorm') {
            state.currentResults.icestorm?.forEach(inst => {
                combined.push({ ...inst, architecture: 'icestorm' });
            });
        }

        return combined;
    }

    function sortData(data) {
        return data.sort((a, b) => {
            let aVal = a[state.sortColumn];
            let bVal = b[state.sortColumn];

            // Handle string comparisons
            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }

            let comparison = 0;
            if (aVal > bVal) comparison = 1;
            if (aVal < bVal) comparison = -1;

            return state.sortDirection === 'asc' ? comparison : -comparison;
        });
    }

    function getSortClass(column) {
        if (state.sortColumn !== column) return '';
        return state.sortDirection === 'asc' ? 'sort-asc' : 'sort-desc';
    }

    // Utilities
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Export for global access
    window.ExplorerApp = {
        init,
        handleSort
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
