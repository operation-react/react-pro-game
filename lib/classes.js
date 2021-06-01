export default function classes(description) {
    return Object.keys(description)
        .filter(key => description[key])
        .join(" ");
}
