//importPackage(Packages.com.sk89q.worldedit);
//importPackage(Packages.com.sk89q.worldedit.math);
//importPackage(Packages.com.sk89q.worldedit.blocks);

importPackage(Packages.com.sk89q.worldedit);
importPackage(Packages.com.sk89q.worldedit.math);
importPackage(Packages.com.sk89q.worldedit.blocks);

var blocks = context.remember();
var session = context.getSession();
var player = context.getPlayer();
var region = session.getRegionSelector(player.getWorld()).getRegion();

if (argv.length < 2)  {
	
	player.print(" ");
	player.print("Cylinder Spiral Generator Script by inHaze");
	player.print(" ");
	player.print("Useage:");
	player.print("/cs spiral <block><radius><coil><count><dFlag><hFlag>");
	player.print(" ");
	player.print("radius - Spiral radius size(1+)");
	player.print("coil - Amount of coil compression(1-10)");
	player.print("count - Number of coil segments generated(1+)");
	player.print("dFlag - Double spiral - 1; Single - 0");
	player.print("hFlag - Alignment: Horizontal - 1; Vertical - 0");
	player.print(" ");
	player.print("Use '/cs server_spiral minecraft:glass 7 6 3 0 0' to generate single");
	player.print("Use '/cs server_spiral minecraft:glass 7 6 3 1 0' to generate double");
}

if (argv.length > 1)  {
	var blocktype = argv.length > 1 ? context.getBlock(argv[1]) : context.getBlock('minecraft:glass');	
	var radius = argv.length > 2 ? (argv[2]) : 5;
	var compress = argv.length > 3 ? (argv[3]) : 3;
	var coilCnt = argv.length > 4 ? (argv[4]) : 3;
	var dFlag = argv.length > 5 ? (argv[5]) : 0;
	var hFlag = argv.length > 6 ? (argv[6]) : 0;
	
	radius = radius > 0 ? radius : 5;
	compress = compress == 0 ? 1 : compress;

	var points = 64;
	var slice = 2 * Math.PI / points;
	var loopCnt = 0;
	
	var sess = context.remember();
	var sel = context.getSession().getSelection(sess.world);
	var origin = sel.getMinimumPoint();
	var sx = origin.getX();
	var sz = origin.getY();
	var sy = origin.getZ();	
	
	for (var i = 0; i < (points * coilCnt); i++)
	{
		var angle = slice * i;
		var newX = (radius * Math.cos(angle));
		var newY = (radius * Math.sin(angle));
		var newZ = (i/compress);

		if (hFlag == 1) {
			var vec = BlockVector3.at(sx+newX, sz-newZ, sy+newY);
			if (dFlag == 1)  {
				var vec2 = BlockVector3.at((sx-newX), sz+newZ, (sy-newY));
			}
		}
		if (hFlag != 1) {
			var vec = BlockVector3.at(sx+newX, sz+newZ, sy+newY);
			if (dFlag == 1)  {
				var vec2 = BlockVector3.at((sx-newX), (sz+newZ), (sy-newY));
			}
		}
		blocks.setBlock(vec, blocktype);
		player.print('set vec '+vec+' '+blocktype)
		if (dFlag == 1)  {
			blocks.setBlock(vec2, blocktype);
			player.print('set vec2 '+vec2+' '+blocktype)
		}
		
		
		loopCnt++;
	}
	player.print(blocktype);
	player.print(loopCnt);
	player.print("New spiral generated with " + loopCnt + " points!  -  [" + radius + ", " + compress + ", " + coilCnt + ", " + dFlag + ", " + hFlag + "]");
}
