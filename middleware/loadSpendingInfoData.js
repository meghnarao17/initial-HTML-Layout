export async function loadSpendingInfoData(req, res, next) {
    try {
        const url = "https://data.princegeorgescountymd.gov/resource/2qma-7ez9.json"
        const data = await fetch(url);
        const json = await data.json();

        const reply = json.filter((item) => Boolean(item.geocoded_column_1)).filter((item) => Boolean(item.name));

        console.log('Results in spendingInfo middleware', json.length);
        req.spendingInfoData = reply;
        next();
    } catch(err){
        console.log('Data request failed', err);
        res.json({message: 'Data request failed', error: err});
    }
}