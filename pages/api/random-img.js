export default function handler(req, res) {
    const imageNumber = parseInt(1 + Math.random() * 10);

    res.status(200).json({
        url: `/img/${ imageNumber }.jpeg`
    });
};