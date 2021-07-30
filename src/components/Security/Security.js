const blockSQLInjection = (string) => {
    // SQL Comment line
    if (string.includes(`'`) || string.includes(`"`) || string.includes(`#`) || string.includes(`--`) || string.includes(`;`)) {
        throw Error;
    }
}

export const blockXSS = (string) => {
    // script tag
    if (string.includes(`</script>`) || string.includes(`document.cookie`) || string.includes(`</div>`)) {
        throw Error;
    }
}
export default blockSQLInjection;