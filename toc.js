// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="index.html">Getting Started With Embedded Rust 🦀</a></li><li class="chapter-item expanded "><a href="introduction/introduction.html"><strong aria-hidden="true">1.</strong> Introduction</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="introduction/who_should_use_this_guide.html"><strong aria-hidden="true">1.1.</strong> Who should use this Guide?</a></li><li class="chapter-item expanded "><a href="introduction/what_youll_need_prerequisites.html"><strong aria-hidden="true">1.2.</strong> What you&#39;ll need (Prerequisites)</a></li><li class="chapter-item expanded "><a href="introduction/how_to_use_this_guide.html"><strong aria-hidden="true">1.3.</strong> How to Use This Guide</a></li></ol></li><li class="chapter-item expanded "><a href="flashing/flashing_rust_is_easier_than_brewing_coffee.html"><strong aria-hidden="true">2.</strong> Flashing Rust is Easier Than Brewing Coffee. ☕</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="flashing/setting-up-your-rust-embedded-toolchain.html"><strong aria-hidden="true">2.1.</strong> Setting Up Your Rust Embedded Toolchain</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="flashing/rp2350_mcu_flashing_methods.html"><strong aria-hidden="true">2.1.1.</strong> RP2350 MCU Flashing Methods</a></li><li class="chapter-item expanded "><a href="flashing/install_tools_for_flashing.html"><strong aria-hidden="true">2.1.2.</strong> Install tools for flashing</a></li></ol></li><li class="chapter-item expanded "><a href="flashing/starting_a_new_project_blinky_rp2350_template.html"><strong aria-hidden="true">2.2.</strong> Starting a New Project – Blinky (RP2350 Template)</a></li></ol></li><li class="chapter-item expanded "><li class="spacer"></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
