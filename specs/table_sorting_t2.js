describe ('table sorting', function () {
    beforeEach ('log in', async function () {
        await browser.url('https://viktor-silakov.github.io/course-sut/index.html?quick')
        await $('#login').setValue('walker@jw.com')
        await $('#password').setValue('password')
        await $('button').click()
        await $('#spinner').waitForDisplayed({ reverse: true, timeout: 15000 })
    })
    afterEach('reload session', async function () {
        await browser.reloadSession()
    })

    async function waitForSorting(element, sortingOrder, timeout){
        await browser.waitUntil(
            async () => {
                try {
                    await expect(element).toHaveAttribute('aria-sort', sortingOrder)
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

    async function assertSorting(cellsList, sortingOrder){
        const initialCellsData = cellsList.map(async (cell) => await cell.getText());
        const initialCellsText = await Promise.all(initialCellsData)
        const sortingMethod = sortingOrder === 'asc' ? (a, b) => a - b : (a, b) => b - a
        let sortedCellsText = Array.from(initialCellsText).sort(sortingMethod)
        expect(initialCellsText).toEqual(sortedCellsText)
    }

    context ('check ID field', async function(){
        it ('ID field straight sorting order', async function(){
            const columnHeader = await $('//*[@tabulator-field="id"][@role="columnheader"]')
            await columnHeader.click()
            await waitForSorting(columnHeader, 'asc', 3000)
            await assertSorting( await $$('//*[@tabulator-field="id"][@role="gridcell"]'), 'asc')
        })
        it ('ID field reverse sorting order', async function(){
            const columnHeader = await $('//*[@tabulator-field="id"][@role="columnheader"]')
            await columnHeader.click()
            await waitForSorting(columnHeader, 'asc', 3000)
            await columnHeader.click()
            await waitForSorting(columnHeader, 'desc', 3000)
            await assertSorting( await $$('//*[@tabulator-field="id"][@role="gridcell"]'), 'desc')
        })
    })

    context ('check Name field', async function(){
        it ('Name field straight sorting order', async function(){
            const columnHeader = await $('//*[@tabulator-field="name"][@role="columnheader"]')
            await columnHeader.click()
            await waitForSorting(columnHeader, 'asc', 3000)
            await assertSorting( await $$('//*[@tabulator-field="name"][@role="gridcell"]'), 'asc')
        })
        it ('Name field reverse sorting order', async function(){
            const columnHeader = await $('//*[@tabulator-field="name"][@role="columnheader"]')
            await columnHeader.click()
            await waitForSorting(columnHeader, 'asc', 3000)
            await columnHeader.click()
            await waitForSorting(columnHeader, 'desc', 3000)
            await assertSorting( await $$('//*[@tabulator-field="name"][@role="gridcell"]'), 'desc')
        })
    })

    context ('check Age field', async function(){
        it ('Age field straight sorting order', async function(){
            const columnHeader = await $('//*[@tabulator-field="age"][@role="columnheader"]')
            await columnHeader.click()
            await waitForSorting(columnHeader, 'asc', 3000)
            await assertSorting( await $$('//*[@tabulator-field="age"][@role="gridcell"]'), 'asc')
        })
        it ('Age field reverse sorting order', async function(){
            const columnHeader = await $('//*[@tabulator-field="age"][@role="columnheader"]')
            await columnHeader.click()
            await waitForSorting(columnHeader, 'asc', 3000)
            await columnHeader.click()
            await waitForSorting(columnHeader, 'desc', 3000)
            await assertSorting( await $$('//*[@tabulator-field="age"][@role="gridcell"]'), 'desc')
        })
    })
})