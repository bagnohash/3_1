const search = document.getElementById('search')
const capital = document.getElementById('capital')
const results = document.getElementById('results')

search.addEventListener('click', async function () {
    const capitalValue = capital.value.trim()

    if (!capitalValue) {
        results.innerHTML = `
        <tr>
            <td colspan="5">Podaj nazwę stolicy</td>
        </tr>
        `
        return
    }

    const response = await fetch(`https://api.restcountries.com/countries/v5/capitals/${capitalValue}`, { headers: { 'Authorization': 'Bearer rc_live_7336a5b39dde44a7b4b934ecee7743a8' } })

    if (response.status === 404 || !response.ok) {
        results.innerHTML = `
        <tr>
            <td colspan="5">Nie znaleziono kraju</td>
        </tr>
        `
        return
    }

    const data = await response.json()
    console.log(data)

    if (!data.data.objects || data.data.objects.length === 0) {
        results.innerHTML = `
        <tr>
            <td>Nie znaleziono kraju</td>
        </tr>
        `
        return
    }

    const country = data.data.objects[0]

    const countryName = country.names.common
    const countryCapital = country.capitals?.[0]?.name ?? '—'
    const countryPopulation = country.population
    const countryRegion = country.region
    const countrySubregion = country.subregion

    results.innerHTML = `
    <tr>
        <td>${countryName}</td>
        <td>${countryCapital}</td>
        <td>${countryPopulation}</td>
        <td>${countryRegion}</td>
        <td>${countrySubregion}</td>
    </tr>
    `
})
