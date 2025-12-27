# 🚀 Apple CPU Microarchitecture Research

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Platform](https://img.shields.io/badge/platform-Apple%20Silicon-lightgrey.svg)
![CPU](https://img.shields.io/badge/CPU-M1%2FA14-orange.svg)
[![Documentation](https://img.shields.io/badge/docs-interactive-brightgreen.svg)](https://ayushmit.github.io/applecpu/demo/)

**Comprehensive documentation of Apple's Firestorm and Icestorm CPU microarchitectures**

[🔥 Interactive Demo](demo/index.html) • [📊 Instruction Explorer](demo/explorer.html) • [📈 Performance Visualizer](demo/visualizer.html) • [📚 Original Research](https://dougallj.github.io/applecpu/firestorm.html)

</div>

---

## 🏗️ Architecture Overview

This repository documents the microarchitecture of Apple's M1/A14 CPU cores through comprehensive performance measurements and analysis.

```
┌─────────────────────────────────────────────────────────────┐
│                   Apple M1 / A14 SoC                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🔥 Firestorm (P-cores)     │    ❄️  Icestorm (E-cores)    │
│  ─────────────────────────  │    ─────────────────────────  │
│  • 4x High-Performance      │    • 4x High-Efficiency       │
│  • 8-wide pipeline          │    • 4-wide pipeline          │
│  • 14 execution units       │    • 7 execution units        │
│  • ~330 entry ROB           │    • ~60 entry ROB            │
│  • Advanced out-of-order    │    • Optimized for power      │
│                             │                               │
└─────────────────────────────────────────────────────────────┘
```

### 🔥 Firestorm (High-Performance Core)
- **Pipeline Width**: 8 uops/cycle
- **Execution Units**: 14 (6 Integer, 4 Load/Store, 4 SIMD/FP)
- **ROB Size**: ~330 coalesced entries, ~623 rename entries
- **Target**: Maximum single-threaded performance

### ❄️ Icestorm (High-Efficiency Core)
- **Pipeline Width**: 4 uops/cycle  
- **Execution Units**: 7 (3 Integer, 2 Load/Store, 2 SIMD/FP)
- **ROB Size**: ~60 coalesced entries, ~111 rename entries
- **Target**: Power-efficient background tasks

---

## ✨ Features

- 🎯 **Comprehensive ARM64 Instruction Analysis** - Detailed latency and throughput measurements for thousands of instructions
- 📊 **Performance Counter Measurements** - Real hardware performance data from Apple Silicon
- 🔬 **Microarchitecture Documentation** - In-depth analysis of pipeline structure and execution units
- 🖥️ **Interactive HTML Viewers** - Browse instruction tables with expandable details
- 📈 **Visual Comparisons** - Side-by-side architecture performance analysis
- 🎨 **Modern Web Interface** - Beautiful, responsive design with dark mode support

---

## 🔗 Quick Links

### Core Documentation
- [🔥 Firestorm Overview](firestorm.html) - High-performance core architecture
- [📋 Firestorm Base Instructions](firestorm-int.html) - Integer instruction performance
- [🧮 Firestorm SIMD/FP Instructions](firestorm-simd.html) - Vector and floating-point operations

### Efficiency Core
- [❄️ Icestorm Overview](icestorm.html) - Efficiency core architecture  
- [📋 Icestorm Base Instructions](icestorm-int.html) - Integer instruction performance
- [🧮 Icestorm SIMD/FP Instructions](icestorm-simd.html) - Vector and floating-point operations

### Interactive Demo
- [🏠 Demo Landing Page](demo/index.html) - Interactive showcase
- [🔍 Instruction Explorer](demo/explorer.html) - Search and compare instructions
- [📊 Performance Visualizer](demo/visualizer.html) - Interactive performance charts

---

## 🎨 Demo Showcase

Explore the interactive demo to visualize and compare CPU performance:

### 🌟 Interactive Features
- **Real-time Instruction Search** - Filter by name, category, or performance metrics
- **Architecture Comparison** - Side-by-side Firestorm vs Icestorm analysis  
- **Performance Charts** - Dynamic visualizations of throughput and latency
- **Dark/Light Themes** - Comfortable viewing in any environment
- **Mobile Responsive** - Full functionality on all devices

---

## 📊 Architecture Comparison

| Feature | Firestorm 🔥 | Icestorm ❄️ |
|---------|-------------|------------|
| **Pipeline Width** | 8 uops/cycle | 4 uops/cycle |
| **Integer Units** | 6 | 3 |
| **Load/Store Units** | 4 | 2 |
| **SIMD/FP Units** | 4 | 2 |
| **ROB (Coalesced)** | ~330 entries | ~60 entries |
| **In-flight Renames** | ~623 | ~111 |
| **Int Register File** | ~380-394 | ~79 |
| **FP/SIMD Register File** | ~432 | ~87 |
| **In-flight Loads** | ~130 | 30 |
| **In-flight Stores** | ~60 | 18 |
| **Target Use Case** | Max Performance | Power Efficiency |

---

## 🚀 Getting Started

### View Documentation Locally

1. Clone the repository:
```bash
git clone https://github.com/AYUSHMIT/applecpu.git
cd applecpu
```

2. Open any HTML file in your browser:
```bash
# View Firestorm overview
open firestorm.html

# Launch interactive demo
open demo/index.html
```

### Explore Online

Visit the [GitHub Pages site](https://ayushmit.github.io/applecpu/) to explore the interactive demo without cloning.

---

## 📖 About This Research

This microarchitecture documentation is based on black-box reverse engineering using performance counters and carefully crafted measurement code. The research builds upon the excellent work of:

- [Andreas Abel](https://uops.info/) - uops.info instruction tables
- [Andrei Frumusanu](https://www.anandtech.com/show/16226/apple-silicon-m1-a14-deep-dive/2) - AnandTech M1 deep dive
- [@Veedrac](https://github.com/Veedrac/microarchitecturometer) - Microarchitecturometer
- [Travis Downs](https://github.com/travisdowns/robsize) - ROB size measurement
- [Henry Wong](http://blog.stuffedcow.net/2013/05/measuring-rob-capacity/) - ROB capacity measurement  
- [Agner Fog](https://agner.org/optimize/) - Optimization manuals
- [Maynard Handley](https://twitter.com/handleym99/status/1437537535018684417) - Architecture analysis

**Note**: This documentation represents best-effort reverse engineering. There may be errors or inaccuracies. All instruction table entries link to the underlying measurements (~35k tables) for verification.

---

## 🤝 Contributing

Contributions are welcome! Whether you've found an error, have additional measurements, or want to improve the documentation:

1. **Report Issues** - Found something incorrect? [Open an issue](https://github.com/AYUSHMIT/applecpu/issues)
2. **Submit Measurements** - Have additional performance data? Submit a PR
3. **Improve Documentation** - Clarify explanations or add examples
4. **Enhance the Demo** - Improve visualizations or add features

### Development

The demo uses pure HTML/CSS/JavaScript with no build process required:
- Edit files directly in the `demo/` directory
- Test locally by opening HTML files in your browser
- Submit pull requests with your improvements

---

## 📄 License

This project is provided as-is for educational and research purposes. No warranty of any kind is provided.

Original research by [Dougall Johnson](https://twitter.com/dougallj).

---

## 🙏 Acknowledgments

- **Dougall Johnson** - Original microarchitecture research and measurements
- **Apple** - For creating fascinating CPU architectures to study
- **ARM** - For the ARM64 instruction set architecture
- The broader CPU architecture research community

---

<div align="center">

**[⬆ Back to Top](#-apple-cpu-microarchitecture-research)**

Made with ❤️ for CPU architecture enthusiasts

</div>