import { NextResponse } from 'next/server'
import { parse } from 'node-html-parser'

interface Vehicle {
	plate_number: string
	vin: string
	date_of_first_registration: string
}

export const GET = async () => {
	const vehicles = [
		{
			id: 0,
			name: "Scania R410"
		}
	]
	return NextResponse.json({ data: vehicles })
}

export const POST = async (request: Request) => {
	const result: Vehicle = await request.json()

	var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
myHeaders.append("Cookie", "JSESSIONID=92BD35465D7E078D554047C571E0A46C; BIGipServerC2_PRD_UL_HIPO-8008=241572268.18463.0000;");

var urlencoded = new URLSearchParams();
urlencoded.append("_historiapojazduportlet_WAR_historiapojazduportlet_:formularz", "_historiapojazduportlet_WAR_historiapojazduportlet_:formularz");
urlencoded.append("_historiapojazduportlet_WAR_historiapojazduportlet_:rej", result.plate_number);
urlencoded.append("_historiapojazduportlet_WAR_historiapojazduportlet_:vin", result.vin);
urlencoded.append("_historiapojazduportlet_WAR_historiapojazduportlet_:data", result.date_of_first_registration);
urlencoded.append("_historiapojazduportlet_WAR_historiapojazduportlet_:btnSprawdz", "Sprawdź pojazd »");
urlencoded.append("javax.faces.ViewState", "8088007539545604870:7185380310558383793");

var requestOptions: any = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};


	const a = await fetch("https://historiapojazdu.gov.pl/strona-glowna/-/hipo/historiaPojazdu/cepik", requestOptions)
	const b = await a.text()

	const root = parse(b);
	const name: any = root.querySelector(
		"#_historiapojazduportlet_WAR_historiapojazduportlet_\\:j_idt10\\:marka"
	);


	return NextResponse.json({ data: name.text ?? "Nie działa"
	})
}