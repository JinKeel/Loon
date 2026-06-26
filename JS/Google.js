if ($response.body) {
    let body = $response.body;

    const pureDarkAndHideFooter = `
    <style id="loon-pure-dark-engine">
        footer, #foot, #fbar, .fbar, #FOOTER {
            display: none !important;
        }

        @media (prefers-color-scheme: dark) {
            html {
                filter: invert(1) hue-rotate(180deg) sepia(0.15) !important;
                background-color: #222222 !important; /* 保持调暗变柔和的背景色 */
            }

            img, 
            video, 
            iframe, 
            canvas, 
            svg,
            [style*="background-image"],
            [role="img"],
            .XNo2Ab, 
            .logo {
                filter: invert(1) hue-rotate(180deg) !important;
            }

            body {
                filter: brightness(0.9) contrast(0.95) !important;
            }

            input, textarea {
                caret-color: #222222 !important; 
            }
        }
    </style>
    `;

    if (body.includes('<head>')) {
        body = body.replace('<head>', '<head>' + pureDarkAndHideFooter);
    } else if (body.includes('<html>')) {
        body = body.replace('<html>', '<html>' + pureDarkAndHideFooter);
    }

    $done({ body });
} else {
    $done({});
}
