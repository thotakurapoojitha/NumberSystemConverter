document.addEventListener('DOMContentLoaded', () => {
    const inputBase = document.getElementById('inputBase');
    const inputNumber = document.getElementById('inputNumber');
    const status = document.getElementById('status');

    const decValue = document.getElementById('decValue');
    const binValue = document.getElementById('binValue');
    const octValue = document.getElementById('octValue');
    const hexValue = document.getElementById('hexValue');

    const baseNames = {
        2: 'Binary',
        8: 'Octal',
        10: 'Decimal',
        16: 'Hexadecimal'
    };

    function resetCards() {
        decValue.textContent = '0';
        binValue.textContent = '0';
        octValue.textContent = '0';
        hexValue.textContent = '0';
    }

    function convertAndUpdate() {
        const base = parseInt(inputBase.value);
        const value = inputNumber.value.trim();

        if (value === '') {
            resetCards();
            status.innerHTML = '<i class="bi bi-info-circle"></i> Start typing to see all conversions.';
            return;
        }

        const num = parseInt(value, base);

        if (isNaN(num) || num < 0) {
            resetCards();
            status.innerHTML = '<i class="bi bi-exclamation-triangle-fill text-warning"></i> Invalid number for ' + baseNames[base] + ' base.';
            return;
        }

        decValue.textContent = num.toString(10).toUpperCase();
        binValue.textContent = num.toString(2).toUpperCase();
        octValue.textContent = num.toString(8).toUpperCase();
        hexValue.textContent = num.toString(16).toUpperCase();

        status.innerHTML = '<i class="bi bi-check-circle-fill text-success"></i> Converted from ' +
            baseNames[base] + ' successfully.';
    }

    inputNumber.addEventListener('input', convertAndUpdate);
    inputBase.addEventListener('change', convertAndUpdate);

    // Copy buttons with fallback
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const targetId = btn.getAttribute('data-target');
            const text = document.getElementById(targetId).textContent;

            const old = status.innerHTML;

            if (navigator.clipboard && window.isSecureContext) {
                try {
                    await navigator.clipboard.writeText(text);
                    status.innerHTML = '<i class="bi bi-clipboard-check text-success"></i> Copied: ' + text;
                } catch {
                    status.innerHTML = '<i class="bi bi-clipboard-x text-danger"></i> Could not copy.';
                }
            } else {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                status.innerHTML = '<i class="bi bi-clipboard-check text-success"></i> Copied: ' + text;
            }

            setTimeout(() => {
                status.innerHTML = old;
            }, 1500);
        });
    });

    resetCards();
});
