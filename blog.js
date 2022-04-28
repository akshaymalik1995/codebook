const codeEle = document.querySelectorAll('pre > code')
        codeEle.forEach(ele => {
            ele.classList.add("language-python")
        })


//  ------------ Javascript for table of contents -----------------
// let's first create a function that will return an object of values of left-padding for each heading




function tableOfContent() {

const defaultPadding = 30

const paddingValues = {
        h2 : 0,
        h3 : defaultPadding * 1,
        h4 : defaultPadding * 2,
        h5 : defaultPadding * 3,
        h6 : defaultPadding * 4
    
}

// Let's parse all the headings under a definitive section of page
// We will call the section as blog__content

const blogContent = document.querySelector('.blog__content')
const headers = blogContent.querySelectorAll('h1, h2, h3, h4, h5, h6')

if (headers) {
    // Create a div element with id 
    const contentListdiv = document.createElement('div')
    contentListdiv.setAttribute('id', 'tableOfContents')
    let headingIdCount = 0
    headers.forEach(header => {
        headingIdCount++
        header.setAttribute("id", `heading-${headingIdCount}`)
        const h = document.createElement('li')
        h.classList.add(header.tagName.toLowerCase())
        const a = document.createElement('a')
        a.setAttribute('href', `#heading-${headingIdCount}`)
        a.innerText = header.innerText
        h.prepend(a)
        h.style.paddingLeft = `${paddingValues[header.tagName.toLowerCase()]}px`
        contentListdiv.appendChild(h)
    })

    const contentHeading = document.createElement('h3')
    contentHeading.style.fontWeight = 'bold'
    contentHeading.innerText = 'Table of Content'
    contentListdiv.prepend(contentHeading)
    blogContent.prepend(contentListdiv)
}
}

document.onload = tableOfContent()

