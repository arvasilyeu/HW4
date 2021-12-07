describe ('currency exchange', function () {
    async function waitForWriteData(step, element, data, timeout) {
        await browser.waitUntil(
            async () => {
                const parsedData = await JSON.parse(await element.getHTML(false))
                try {
                    expect(parsedData[step]).toEqual(data)
                } catch {
                    return false
                }
                return true
            },
            {   timeout: timeout,
                timeoutMsg: 'Actual value is not equal to expected!'
            }
        );
    }

    before ('log in', async function () {
        await browser.url('https://viktor-silakov.github.io/course-sut/index.html?quick')
        await $('#login').setValue('walker@jw.com')
        await $('#password').setValue('password')
        await $('button').click()
        await $('#spinner').waitForDisplayed({ reverse: true, timeout: 15000 })
    })

    it ('should calculate currency exchange correct', async function () {
        const necessaryObjects = [{"num":"1"},{"num":"2"},{"num":"3"},{"num":"4"}];
        const inputField = await $('//*[@id="sum-to-buy"]')
        const dataBase = await $('//*[@id="database"]')
        
        await inputField.addValue(necessaryObjects[0].num)
        await waitForWriteData(0, dataBase, necessaryObjects[0], 5000)

        await inputField.addValue(necessaryObjects[1].num)
        await waitForWriteData(1, dataBase, necessaryObjects[1], 5000)

        await inputField.addValue(necessaryObjects[2].num)
        await waitForWriteData(2, dataBase, necessaryObjects[2], 5000)

        await inputField.addValue(necessaryObjects[3].num)
        await waitForWriteData(3, dataBase, necessaryObjects[3], 5000)

        await $('//button[text()="Buy"]').click();
        const exchangeResult = await $('//*[@id="withdrew"]').getText()
        const sum = necessaryObjects.map( (object) => object.num ).join("")
        const rate = await $("#currency-rate").getText();
        expect(exchangeResult).toEqual(`${sum} => ${+sum * +rate}`);
    })
})