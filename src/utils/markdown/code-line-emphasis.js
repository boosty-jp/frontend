export const toNumberedContent = (content, startNumber, emphasisLines) => {
    let lineNumber = 0;
    if (startNumber && !isNaN(startNumber)) {
        lineNumber = startNumber - 1;
        if (lineNumber <= -1) lineNumber = 0;
    } else {
        return content;
    }

    const startLineNumber = lineNumber;
    let emphasisLinesArray = splitEmphasisLines(emphasisLines)

    const commentPattern = /<span class="hljs-comment">(.|\n)*?<\/span>/g
    const adaptedHighlightedContent = content.replace(commentPattern, data => {
        return data.replace(/\r?\n/g, () => {
            return '\n<span class="hljs-comment">'
        })
    })

    const contentTable = adaptedHighlightedContent.split(/\r?\n/).map((lineContent, idx) => {
        if (adaptedHighlightedContent.split(/\r?\n/).length === idx + 1) return;
        lineNumber++;
        let lineClassName = `'md-code-line-number' data-pseudo-content=${lineNumber}`
        let contentClassName = `'md-code-content'`

        // 強調するラインがある場合
        if (emphasisLinesArray.indexOf(idx + startLineNumber + 1) >= 0) {
            lineClassName = `'md-code-line-number md-code-emphasis' data-pseudo-content=${lineNumber}`
            contentClassName = `'md-code-content md-code-emphasis'`
        }

        return `<tr>
              <td class=${lineClassName}></td>
              <td class=${contentClassName}>${lineContent}</td>
            </tr>`
    }).join('')

    return `<table class='md-code-table'>${contentTable}</table>`
}

const splitEmphasisLines = (str) => {
    if (!str) return [];
    let strSplited = str.split(',');

    //数字に変換する
    let results = [];
    strSplited.forEach(i => {
        if (!isNaN(i)) {
            results.push(parseInt(i));
        } else {
            let multiLines = i.split('-');
            let start = multiLines[0];
            let end = multiLines[1];
            if (!isNaN(start) && !isNaN(end) && (end - start >= 0)) {
                results = [...results, ...[...Array(end - start + 1).keys()].map(i => i + parseInt(start))];
            }
        }
    });

    //重複削除
    let set = new Set(results);
    return Array.from(set);
}