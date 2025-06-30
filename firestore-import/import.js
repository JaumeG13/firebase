import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { readFile } from "fs/promises";

const firebaseConfig = {
  apiKey: "AIzaSyB48KkdlQb794w2euzJWHwkUfz1xXbBQ38",
  authDomain: "circuit-f666e.firebaseapp.com",
  projectId: "circuit-f666e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const data = await readFile("./drivers.json", "utf8");
const drivers = JSON.parse(data);

async function importDrivers() {
  for (const driver of drivers) {
    const ref = doc(db, "drivers", String(driver["steam-id"]));

    await setDoc(ref, {
      name: driver.name,
      country: driver.country,
      "race-starts": driver["race-starts"],
      "race-finishes": driver["race-finishes"],
      wins: driver.wins,
      podiums: driver.podiums,
      poles: driver.poles,
      "fastest-laps": driver["fastest-laps"]
    });

    console.log(`✅ Imported: ${driver.name}`);
  }
}

importDrivers().catch(console.error);
