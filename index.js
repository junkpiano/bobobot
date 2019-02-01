const Telegraf = require("telegraf");
const axios = require("axios");

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

bot.command("lunch9", ctx => {
	axios
		.get(
			"http://rakuten-towerman.azurewebsites.net/towerman-restapi/rest/cafeteria/menulist?menuDate=20190201"
		)
		.then(response => {
			ctx.replyWithMediaGroup(processResponse(response, 1, "9F"));
		})
		.catch(error => {
			ctx.reply("sorry, something is wrong.");
		});
	ctx.reply("just a moment, please.");
});

bot.command("lunch22", ctx => {
	axios
		.get(
			"http://rakuten-towerman.azurewebsites.net/towerman-restapi/rest/cafeteria/menulist?menuDate=20190201"
		)
		.then(response => {
			ctx.replyWithMediaGroup(processResponse(response, 1, "22F"));
		})
		.catch(error => {
			ctx.reply("sorry, something is wrong.");
		});
	ctx.reply("just a moment, please.");
});

bot.command("dinner9", ctx => {
	axios
		.get(
			"http://rakuten-towerman.azurewebsites.net/towerman-restapi/rest/cafeteria/menulist?menuDate=20190201"
		)
		.then(response => {
			ctx.replyWithMediaGroup(processResponse(response, 2, "9F"));
		})
		.catch(error => {
			ctx.reply("sorry, something is wrong.");
		});
	ctx.reply("just a moment, please.");
});

bot.command("dinner22", ctx => {
	axios
		.get(
			"http://rakuten-towerman.azurewebsites.net/towerman-restapi/rest/cafeteria/menulist?menuDate=20190201"
		)
		.then(response => {
			ctx.replyWithMediaGroup(processResponse(response, 2, "22F"));
		})
		.catch(error => {
			ctx.reply("sorry, something is wrong.");
		});
	ctx.reply("just a moment, please.");
});
bot.launch();
