const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./adventurer_sprite_sheet_v1.1.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);

	const adventurer = new Adventurer(gameEngine);
  gameEngine.addEntity(adventurer);
	
	gameEngine.start();
});
