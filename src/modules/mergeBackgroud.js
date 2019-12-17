//Voeg een key 'achtergrond' toe met alle achtergronden
export function addKey(results){
  results.map(result => {
		result.achtergrond = result.achtergrond_Aru + ', ' + result.achtergrond_Cur + ', ' + result.achtergrond_Mar
    + ', ' + result.achtergrond_NL + ', ' + result.achtergrond_Sur  + ', ' + result.achtergrond_Tur + ', ' + result.achtergrond_anders
    + ', ' + result.achtergrond_geenantwoord + ', ' + result.achtergrond_nietzeggen + ', ' + result.achtergrond_openantwoord
  })
	return results
}