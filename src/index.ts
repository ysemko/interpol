import { RedNoticesEntity } from "interpol.ts/dist/models/RedNotices";
import { AppDataSource } from "./data-source"
import { InterpolService } from "interpol.ts";
import { RedNoticeDetailsEntityDB } from "./entity/RedNoticeDetails";
import { YellowNoticeDetailsEntityDB } from "./entity/YellowNoticeDetails";
import { YellowNoticesEntity } from "interpol.ts/dist/models/YellowNotices";
import { Country } from "./entity/Country";

let loggingIntervalId: NodeJS.Timeout;

AppDataSource.initialize().then(async () => {
    console.log("Init done")

    const start = Date.now();
    const stats = {
        countCountries: 0,
        activeCountry: 0,
        activeCountryId: "",
        newNoticeCount: 0,
        failedRequests: 0,
        requests: 0,
    };

    try {

        backgroundLogs(stats, start);
        await fetchRedNotices(stats);
        await fetchYellowNotices(stats);

        const countries: Country[] = await AppDataSource.manager
            .createQueryBuilder(Country, "country")
            .distinctOn(["country.country_id"]).orderBy("country.country_id", "ASC")
            .getMany();

        stats.countCountries = countries.length;

        for (const country of countries) {
            stats.activeCountry = countries.findIndex(c => c.country_id === country.country_id);
            stats.activeCountryId = country.country_id;

            for (let age = 10; age < 90; age += 1) {
                //Males
                await fetchRedNotices(stats, { arrestWarrantCountryId: country.country_id, nationality: country.country_id, ageMax: age, ageMin: age, sexId: "M" });
                await fetchRedNotices(stats, { arrestWarrantCountryId: country.country_id, ageMax: age, ageMin: age, sexId: "M" });
                await fetchRedNotices(stats, { nationality: country.country_id, ageMax: age, ageMin: age, sexId: "M" });
                await fetchYellowNotices(stats, { nationality: country.country_id, ageMax: age, ageMin: age, sexId: "M" });
                //Females
                await fetchRedNotices(stats, { arrestWarrantCountryId: country.country_id, nationality: country.country_id, ageMax: age, ageMin: age, sexId: "F" });
                await fetchRedNotices(stats, { arrestWarrantCountryId: country.country_id, ageMax: age, ageMin: age, sexId: "F" });
                await fetchRedNotices(stats, { nationality: country.country_id, ageMax: age, ageMin: age, sexId: "F" });
                await fetchYellowNotices(stats, { nationality: country.country_id, ageMax: age, ageMin: age, sexId: "F" });
                //Unknown
                await fetchRedNotices(stats, { arrestWarrantCountryId: country.country_id, nationality: country.country_id, ageMax: age, ageMin: age, sexId: "U" });
                await fetchRedNotices(stats, { arrestWarrantCountryId: country.country_id, ageMax: age, ageMin: age, sexId: "U" });
                await fetchRedNotices(stats, { nationality: country.country_id, ageMax: age, ageMin: age, sexId: "U" });
                await fetchYellowNotices(stats, { nationality: country.country_id, ageMax: age, ageMin: age, sexId: "U" });
                // NULL
                await fetchRedNotices(stats, { arrestWarrantCountryId: country.country_id, nationality: country.country_id, ageMax: age, ageMin: age });
                await fetchRedNotices(stats, { arrestWarrantCountryId: country.country_id, ageMax: age, ageMin: age });
                await fetchRedNotices(stats, { nationality: country.country_id, ageMax: age, ageMin: age });
                await fetchYellowNotices(stats, { nationality: country.country_id, ageMax: age, ageMin: age });
            }

            await fetchRedNotices(stats, { arrestWarrantCountryId: country.country_id });
            await fetchRedNotices(stats, { nationality: country.country_id });
            await fetchYellowNotices(stats, { nationality: country.country_id });
        }

        console.log("Time taken: " + (Date.now() - start) / 1000 + " seconds");
        stopLogging();


    } catch (error) {
        console.error("Error fetching data:", error);
    }
}).catch(error => console.log(error))



async function fetchRedNotices(stats: any, params = {}): Promise<number> {
    let noticeEntities: RedNoticeDetailsEntityDB[] = [];
    try {
        const redNotices: RedNoticesEntity = await InterpolService.getRedNotices({ resultPerPage: 200, page: 1, ...params });
        stats.requests++;
        for (const notice of redNotices._embedded.notices) {
            if (await AppDataSource.getRepository(RedNoticeDetailsEntityDB).findOne({ where: { entity_id: notice.entity_id } })) {
                return
            }
            const id = notice.entity_id.replace("/", "-");
            const redNoticeDetails = await InterpolService.getRedNoticeDetails(id);
            noticeEntities.push(new RedNoticeDetailsEntityDB(redNoticeDetails));
        }

        await AppDataSource.manager.save(noticeEntities).catch(() => stats.failedRequests++);
        stats.savedNotices += noticeEntities.length;
        return noticeEntities.length;

    } catch (error) {
        console.error("Error fetching data:", error);
        stats.failedRequests++;
    }
}

async function fetchYellowNotices(stats: any, params = {}): Promise<number> {
    let noticeEntities: YellowNoticeDetailsEntityDB[] = [];
    try {
        const yellowNotices: YellowNoticesEntity = await InterpolService.getYellowNotices({ resultPerPage: 200, page: 1, ...params });

        for (const notice of yellowNotices._embedded.notices) {
            if (await AppDataSource.getRepository(YellowNoticeDetailsEntityDB).findOne({ where: { entity_id: notice.entity_id } })) {
                return
            }
            const id = notice.entity_id.replace("/", "-");
            const yellowNoticeDetails = await InterpolService.getYellowNoticeDetails(id);
            noticeEntities.push(new YellowNoticeDetailsEntityDB(yellowNoticeDetails));
        }

        await AppDataSource.manager.save(noticeEntities).catch(() => stats.failedRequests++);
        stats.savedNotices += noticeEntities.length;
        return noticeEntities.length;

    } catch (error) {
        console.error("Error fetching data:", error);
        stats.failedRequests++;
    }
}

function backgroundLogs(stats: any, start) {
    loggingIntervalId = setInterval(() => {
        console.clear();
        console.log("----------------------------------------");
        console.log("Elapsed time: " + (Date.now() - start) / 1000 + " seconds");
        console.log("Total requests made: " + stats.requests);
        console.log("requests per second: " + (stats.requests / ((Date.now() - start) / 1000)).toFixed(4));
        console.log("Current country: " + stats.activeCountryId);
        console.log("New notices fetched: " + stats.newNoticeCount);
        console.log("Failed requests: " + stats.failedRequests);
        console.log("Countries processed: " + stats.activeCountry + "/ " + stats.countCountries + " (" + (stats.activeCountry / stats.countCountries * 100).toFixed(2) + "%)");
        console.log("Estimated time left: " + (((Date.now() - start) / stats.activeCountry) * (stats.countCountries - stats.activeCountry) / 1000).toFixed(0) + " seconds");
        console.log("----------------------------------------");
    }, 5000);
}

function stopLogging() {
    if (loggingIntervalId) {
        clearInterval(loggingIntervalId);
        console.log("Logging stopped.");
    }
}

