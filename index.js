const Telegraf = require("telegraf");
const axios = require("axios");
const moment = require("moment");

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start(ctx => ctx.reply("Welcome"));
bot.help(ctx => ctx.reply("Send me a sticker"));
bot.on("sticker", ctx => ctx.reply("👍"));
bot.hears("hi", ctx => ctx.reply("Hey there"));

function processResponse(response, mealTime, floor) {
	const listMeals = response.data.data;
	result = [];

	for (var meal of listMeals) {
		if (meal.mealTime === mealTime) {
			if (meal.cafeteriaId == floor) {
				result.push({
					type: "photo",
					media: meal.imageURL,
					caption: meal.cafeteriaId + ": " + meal.menuType
				});
			}
		}
	}

	return result;
}

function handleRequest(ctx, mealTime, floor) {
	const endpoint =
		"http://rakuten-towerman.azurewebsites.net/towerman-restapi/rest/cafeteria/menulist?menuDate=" +
		moment().format("YYYYMMDD");

	axios
		.get(endpoint)
		.then(response => {
			const result = processResponse(response, mealTime, floor);
			console.log(result);
			const segment = 9;
			for (var index = 0; index < result.length / segment; index++) {
				var endIndex =
					(index + 1) * segment <= result.length
						? (index + 1) * segment
						: result.length;
				ctx.replyWithMediaGroup(
					result.slice(0 + segment * index, endIndex)
				);
			}
		})
		.catch(error => {
			ctx.reply("sorry, something is wrong.");
		});
	ctx.reply("just a moment, please.");
}

bot.command("lunch9", ctx => {
	handleRequest(ctx, 1, "9F");
});

bot.command("lunch22", ctx => {
	handleRequest(ctx, 1, "22F");
});

bot.command("dinner9", ctx => {
	handleRequest(ctx, 2, "9F");
});

bot.command("dinner22", ctx => {
	handleRequest(ctx, 2, "22F");
});

bot.launch();
