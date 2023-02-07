import { GameDoctor } from './lib'
import './style.css'



const appWindow = document.getElementById('app') as HTMLDivElement
const reportOutputDiv = document.getElementById('reportOutput') as HTMLDivElement
const reportInputTextarea = document.getElementById('reportInputTextarea') as HTMLTextAreaElement
const printButton = document.getElementById('printButton') as HTMLButtonElement
const resetButton = document.getElementById('resetButton') as HTMLButtonElement
const reportTitle = document.getElementById('reportTitle') as HTMLHeadingElement



// #region Swap Views

let currentView = 'ready'

const changeView = (view: string) => {
    const currentlyVisibleEls = document.querySelectorAll<HTMLDivElement>(`[data-view=${currentView}]`)
    for (let el of Array.from(currentlyVisibleEls)) {
        el.style.display = 'none'
    }

    const newVisibleEls = document.querySelectorAll<HTMLDivElement>(`[data-view=${view}]`)
    for (let el of Array.from(newVisibleEls)) {
        el.style.display = 'block'
    }

    currentView = view

    appWindow.setAttribute('data-current-view', view)
}

const resetView = () => {
    changeView('ready')
    reportInputTextarea.value = ''
    reportOutputDiv.innerHTML = ''
    document.title = 'Game Doctor by Two-Cat Moon'
}

// #endregion



// #region Generate Report Markup

const keyToLabel = (key: string) => {
    return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
}

const generateTable = (data: Record<string, any> | any[]) => {
    if (data === null) return 'NULL'
    if (data === undefined) return 'UNDEFINED'

    if (Array.isArray(data)) {
        let html = '<ul>'

        for (let item of data) {
            if (typeof item === 'object') {
                html += '<li>' + generateTable(item) + '</li>'
            } else {
                html += `<li>${item}</li>`
            }
        }

        html += '</ul>'

        return html
    }

    let html = '<table>'

    for (let key of Object.keys(data)) {
        html += '<tr>'
        html += `<td><strong>${keyToLabel(key)}</strong></td>`

        if (typeof data[key] === 'object') {
            html += '<td>' + generateTable(data[key]) + '</td>'
        } else {
            html += `<td>${data[key]}</td>`
        }

        html += '</tr>'
    }

    html += '</table>'

    return html
}

const generateReportMarkup = (report: any) => {
    reportTitle.innerHTML = `Diagnostic Report for ${report.gameName}`
    document.title = `Diagnostic Report for ${report.gameName}`

    let html = ''

    for (let key of Object.keys(report)) {
        let sectionHtml = '<section>'
        sectionHtml += `<h3>${keyToLabel(key)}</h3>`
        if (key === 'screenshot') {
            sectionHtml += `<img src="${report[key]}" alt="screenshot" />`
        } else if (typeof report[key] === 'object') {
            sectionHtml += generateTable(report[key])
        } else {
            sectionHtml += `${report[key]}`
        }
        sectionHtml += '</section>'
        html += sectionHtml
    }

    return html
}

// #endregion



// #region Ready View

// base64 input
reportInputTextarea.addEventListener('input', async () => {
    const base64 = reportInputTextarea.value

    try {
        const report = await GameDoctor.decodeBase64(base64)
        const html = generateReportMarkup(report)
        reportOutputDiv.innerHTML = html
        changeView('report')
    } catch {
        resetView()
    }
})

// image/png input
appWindow.addEventListener('dragover', (e) => {
    e.preventDefault()
    e.stopPropagation()
})

appWindow.addEventListener('drop', (e) => {
    e.preventDefault()
    e.stopPropagation()

    try {
        // Get image file from drop
        const file = e.dataTransfer!.files[0]

        // Convert file to image dataurl
        const reader = new FileReader()
        reader.onerror = () => {
            resetView()
        }
        reader.onload = async (e) => {
            const imageUrl = e.target!.result as string
            const report = await GameDoctor.decodeImageUrl(imageUrl)
            const html = generateReportMarkup(report)
            reportOutputDiv.innerHTML = html
            changeView('report')
        }
        reader.readAsDataURL(file)
    } catch {
        resetView()
    }
})

// #endregion



// #region Report View

printButton.addEventListener('click', () => {
    window.print()
})

resetButton.addEventListener('click', () => {
    resetView()
})

// #endregion