(() => {
    const root = document.documentElement;
    const button = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('java-book-theme');

    if (savedTheme) {
        root.setAttribute('data-theme', savedTheme);
    }

    if (button) {
        const syncLabel = () => {
            const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
            button.textContent = current === 'dark' ? 'Switch to Light' : 'Switch to Dark';
        };

        syncLabel();

        button.addEventListener('click', () => {
            const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            localStorage.setItem('java-book-theme', next);
            syncLabel();
        });
    }

    document.querySelectorAll('.nav-list a').forEach((link) => {
        if (link.getAttribute('href') === window.location.pathname.split('/').pop()) {
            link.classList.add('active');
        }
    });

    document.querySelectorAll('pre code').forEach((codeNode) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block';
        const copyBtn = document.createElement('button');
        copyBtn.type = 'button';
        copyBtn.textContent = 'Copy';

        const pre = codeNode.parentElement;
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(copyBtn);
        wrapper.appendChild(pre);

        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(codeNode.innerText);
                copyBtn.textContent = 'Copied';
                setTimeout(() => {
                    copyBtn.textContent = 'Copy';
                }, 900);
            } catch (error) {
                copyBtn.textContent = 'Failed';
            }
        });
    });
})();
