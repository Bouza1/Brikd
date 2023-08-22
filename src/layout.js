const containerSize = returnContainerSize(isMobileDevice())

function isMobileDevice() 
{
  return(isIOS()||/Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent));
}

function isIOS() {
  if (/iPad|iPhone|iPod/.test(navigator.platform)) {
    return true;
  } else {
    return navigator.maxTouchPoints &&
      navigator.maxTouchPoints > 2 &&
      /MacIntel/.test(navigator.platform);
  }
}

export function returnContainerSize(isMobile)
{
  let tempHolder = []
  if(isMobile)
  {
    tempHolder.push(window.innerWidth * 0.9)
    tempHolder.push((window.innerWidth)*0.625)
  }
  else 
  {
    tempHolder.push(window.innerWidth * 0.6)
    tempHolder.push((window.innerWidth)*0.425)
  }
  return tempHolder
}



function returnTitleScreenScales() 
{
  const optimalScreenWidth = 1152;
  const screenWidth = containerSize[0];
  const scaleFactor = screenWidth / optimalScreenWidth;
  const optimalPlayButton = 160
  const optimalControlButton = 140
  const optimalLeaderButton = 200
  const titleBannerScale = 0.7 * scaleFactor;
  const playButtonSize = Math.round(optimalPlayButton * scaleFactor) + 'px';
  const controlButtonSize = Math.round(optimalControlButton * scaleFactor) + 'px';
  const leaderButtonSize = Math.round(optimalLeaderButton * scaleFactor) + 'px';
  return {'titleBanner':titleBannerScale,"playButton":playButtonSize, "controlButton":controlButtonSize, "leaderButton":leaderButtonSize}
}

function returnControlsScreenScales()
{
  const optimalScreenWidth = 1152;
  const screenWidth = containerSize[0];
  const scaleFactor = screenWidth / optimalScreenWidth;
  const optimalCoseButton = 180;
  const optimalBigTitle = 110;
  const optimalMedTitle = 90;
  const optimalSMTitle = 60;
  const optimalXSTitle = 50;
  const bigTitle = Math.round(optimalBigTitle * scaleFactor) + 'px';
  const medTitle = Math.round(optimalMedTitle * scaleFactor) + 'px';
  const smTitle = Math.round(optimalSMTitle * scaleFactor) + 'px';
  const xsTitle = Math.round(optimalXSTitle * scaleFactor) + 'px';
  const closeButton = Math.round(optimalCoseButton * scaleFactor) + 'px';
  
  const controlsImageSize = 0.8 * scaleFactor;
  const powerupImageSize = 0.5 * scaleFactor;
  return {'bigTitle':bigTitle, 'medTitle':medTitle, 'smTitle':smTitle, 'xsTitle':xsTitle, 'controlsImageSize':controlsImageSize, 'powerupImageSize':powerupImageSize, 'closeButton':closeButton} 
}

function returnCountdownScreenScales()
{
  const optimalScreenWidth = 1152;
  const screenWidth = containerSize[0];
  const scaleFactor = screenWidth / optimalScreenWidth;
  const optimalBigTitle = 70;
  const bigTitle = Math.round(optimalBigTitle * scaleFactor) + 'px';
  const optimalXsTitle = 40;
  const xsTitle = Math.round(optimalXsTitle * scaleFactor) + 'px';
  const optimalCountdownText = 240;
  const countdownText = Math.round(optimalCountdownText * scaleFactor) + 'px';
  return {'bigTitle':bigTitle, "countdownText":countdownText, 'xsTitle':xsTitle} 
}

function returnGameScreenScales()
{
  const optimalScreenWidth = 1152;
  const screenWidth = containerSize[0];
  const scaleFactor = screenWidth / optimalScreenWidth;
  const optimalBigTitle = 70;
  const optimalMedTitle = 55;
  const optimalXsTitle = 40;
  const optimalPowerUpImage = 0.3
  const optimalXLPadel = 0.4
  const xsTitle = Math.round(optimalXsTitle * scaleFactor) + 'px';
  const bigTitle = Math.round(optimalBigTitle * scaleFactor) + 'px';
  const medTitle = Math.round(optimalMedTitle * scaleFactor) + 'px';
  const powerupImageBig = optimalPowerUpImage * scaleFactor;
  const xlPadelImage = optimalXLPadel * scaleFactor
  const optimalBrickSize = 10;
  const brickSize = optimalBrickSize * scaleFactor;
  const optimalBrickSpacingY = 15
  const brickY = optimalBrickSpacingY * scaleFactor;
  const optimalBrickSpacingX = 16.95
  const brickX = optimalBrickSpacingX * scaleFactor; 
  return {'bigTitle':bigTitle, 'medTitle':medTitle,  'powerupImageBig':powerupImageBig, 'xlPadelImage':xlPadelImage, "xsTitle":xsTitle, 'brickSize':brickSize, 'brickY':brickY, 'brickX':brickX} 
}

export const layoutObj = 
{
  "mobile":isMobileDevice(),
  "fullX":containerSize[0],
  "fullY":containerSize[1],
  "1col":containerSize[0]/10,
  "1row":containerSize[1]/10,
  "midX":containerSize[0]/2,
  "midY":containerSize[1]/2,
  "titleScreen":returnTitleScreenScales(),
  "controlsScreen":returnControlsScreenScales(),
  "countdownScreen":returnCountdownScreenScales(),
  "gameScreen":returnGameScreenScales(),
  "endScreen":"Holder"
}
