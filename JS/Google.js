if ($response.body) {
    let body = $response.body;

    const pureDarkAndHideFooter = `
    <style id="loon-pure-dark-engine">
        /* 隐藏页脚 */
        footer, #foot, #fbar, .fbar, #FOOTER {
            display: none !important;
        }

        @media (prefers-color-scheme: dark) {
            html, body {
                background-color: #121212 !important; 
                min-height: 100vh !important;
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
            }
            
            html {
                filter: invert(1) hue-rotate(180deg) sepia(0.15) !important;
            }

            /* 3. 反转媒体元素，防止图片、图标变底片 */
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

            /* 4. 调整整体亮度与对比度 */
            body {
                filter: brightness(0.9) contrast(0.95) !important;
            }

            input, textarea {
                caret-color: #222222 !important; 
            }
        }
    </style>
    `;

    // 注入 HTML
    if (body.includes('<head>')) {
        body = body.replace('<head>', '<head>' + pureDarkAndHideFooter);
    } else if (body.includes('<html>')) {
        body = body.replace('<html>', '<html>' + pureDarkAndHideFooter);
    }

    $done({ body });
} else {
    $done({});
}
