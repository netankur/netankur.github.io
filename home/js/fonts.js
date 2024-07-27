        // Function to change fonts
        function changeFonts() {
            fetch('https://netankur.github.io/home/json/fonts.json')
                .then(response => response.json())
                .then(data => {
                    const fonts = data.items;
                    
                    // Select two random fonts
                    const randomFont1 = fonts[Math.floor(Math.random() * fonts.length)];
                    const randomFont2 = fonts[Math.floor(Math.random() * fonts.length)];

                    // Construct font URLs based on the selected random fonts
                    const regularFontUrl1 = randomFont1.files.regular.replace(/^http:\/\//i, 'https://');
                    const fontName1 = randomFont1.family;

                    const regularFontUrl2 = randomFont2.files.regular.replace(/^http:\/\//i, 'https://');
                    const fontName2 = randomFont2.family;

                    // Apply the fonts to body and headers
                    applyFont(regularFontUrl1, fontName1, 'body');
                    applyFont(regularFontUrl2, fontName2, 'header');
                })
                .catch(error => console.error('Error fetching fonts:', error));
        }

        // Function to apply fetched font to body and headers
        function applyFont(fontUrl, fontName, element) {
            const fontFace = new FontFace(fontName, `url(${fontUrl})`);

            fontFace.load()
                .then(loadedFont => {
                    document.fonts.add(loadedFont);

                    // Apply to specified element ('body' or 'header')
                    if (element === 'body') {
                        document.body.style.fontFamily = fontName;
                    } else if (element === 'header') {
                        // Apply to headers h1 to h7
                        for (let i = 1; i <= 7; i++) {
                            const header = document.getElementsByTagName(`h${i}`)[0];
                            if (header) {
                                header.style.fontFamily = fontName;
                            }
                        }
                    }
                })
                .catch(error => console.error('Font loading failed:', error));
        }