        function changeFonts() {
            fetch('https://netankur.github.io/home/json/fonts.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch fonts');
                    }
                    return response.json();
                })
                .then(data => {
                    const fonts = data.items;
                    const randomFont1 = fonts[Math.floor(Math.random() * fonts.length)];
                    const randomFont2 = fonts[Math.floor(Math.random() * fonts.length)];

                    const regularFontUrl1 = randomFont1.files.regular.replace(/^http:\/\//i, 'https://');
                    const fontName1 = randomFont1.family;

                    const regularFontUrl2 = randomFont2.files.regular.replace(/^http:\/\//i, 'https://');
                    const fontName2 = randomFont2.family;

                    applyFont(regularFontUrl1, fontName1, 'body');
                    applyFont(regularFontUrl2, fontName2, 'header');
                })
                .catch(error => {
                    console.error('Error fetching or applying fonts:', error);
                    // Handle error gracefully, e.g., fallback to default fonts
                });

            function applyFont(fontUrl, fontName, element) {
                const fontFace = new FontFace(fontName, `url(${fontUrl})`);

                fontFace.load()
                    .then(loadedFont => {
                        document.fonts.add(loadedFont);

                        if (element === 'body') {
                            document.body.style.fontFamily = fontName;
                        } else if (element === 'header') {
                            for (let i = 1; i <= 7; i++) {
                                const header = document.getElementsByTagName(`h${i}`)[0];
                                if (header) {
                                    header.style.fontFamily = fontName;
                                }
                            }
                        }
                    })
                    .catch(error => {
                        console.error(`Font '${fontName}' loading failed:`, error);
                        // Handle font loading failure, e.g., fallback to default fonts
                    });
            }
        }

        // Call changeFonts function when the DOM is ready
        document.addEventListener('DOMContentLoaded', changeFonts);