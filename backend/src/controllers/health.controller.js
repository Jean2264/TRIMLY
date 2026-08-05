function health(req, res) {
    console.log("Entró al controller");

    res.json({
        status: "ok"
    });
}

export { health };