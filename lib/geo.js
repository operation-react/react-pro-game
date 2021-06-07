export function dist(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

export function inter(fromValue, toValue, progress) {
    return fromValue + (toValue - fromValue) * progress;
}
