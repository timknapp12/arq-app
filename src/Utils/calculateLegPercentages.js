// this function is to calculate the max QOV per leg based on what the
// current user's QOV is per each leg

export const calculateLegPercentages = (user, requirements) => {
  let leg1Max;
  let leg2Max;
  let leg3Max;
  // LOWER LEVELS WITH 60% MAX
  if (requirements.legMaxPerc === 60) {
    // start with 100% of possible QOV per required rank
    let remainingPerc = 100;
    // get the user's QOV percentage of FIRST leg of the requirement
    let perc1 = Math.round((user.leg1OV / requirements.requiredQOV) * 100);
    if (perc1 >= 60 || perc1 < 34) {
      perc1 = 60;
    }
    remainingPerc -= perc1;
    // leg1 is the total points from leg 1 based on the total QOV requirememt for that rank
    const leg1 = Math.round((requirements.requiredQOV * perc1) / 100);
    // cap the value of the leg at the max of the requirement for that rank
    leg1Max = leg1 >= requirements.legMaxOV ? requirements.legMaxOV : leg1;

    // get the user's QOV percentage of SECOND leg of the requirement
    let perc2 = Math.round((user.leg2OV / requirements.requiredQOV) * 100);
    const halfOfRemainingPerc = remainingPerc / 2;
    if (perc2 >= 40 || perc2 < 20) {
      perc2 = 40;
    }

    if (perc2 < halfOfRemainingPerc) {
      perc2 = halfOfRemainingPerc;
    }
    remainingPerc -= perc2;

    const leg2 = Math.round((requirements.requiredQOV * perc2) / 100);
    leg2Max = leg2 >= requirements.legMaxOV ? requirements.legMaxOV : leg2;

    // calculate the max possible QOV of the THIRD leg based on percentage of first two legs
    leg3Max = requirements.requiredQOV * (remainingPerc / 100);

    // if the leg is qualified, then have the max be the same as the QOV per leg so the svg chart shows the full amount of points
    leg1Max = user.leg1OV >= leg1Max ? user.leg1OV : leg1Max;
    leg2Max = user.leg2OV >= leg2Max ? user.leg2OV : leg2Max;
    leg3Max = user.leg3OV >= leg3Max ? user.leg3OV : leg3Max;
    return {
      leg1Max,
      leg2Max,
      leg3Max,
    };
  } else if (requirements.legMaxPerc === 50) {
    // MID LEVELS WITH 50% MAX
    let remainingPerc = 100;
    // percentage of the first leg of the overall total requirements
    let perc1 = Math.round((user.leg1OV / requirements.requiredQOV) * 100);
    // percent of the first is capped at 50 and should be at least 25
    if (perc1 >= 50 || perc1 < 25) {
      perc1 = 50;
    }
    remainingPerc -= perc1;

    // percent of the second is capped at 50 and should be at least 25
    let perc2 = Math.round((user.leg2OV / requirements.requiredQOV) * 100);
    if (perc2 >= 50 || perc2 < 25) {
      perc2 = 50;
    }
    remainingPerc -= perc2;

    let perc3 = remainingPerc;
    if (perc3 >= 50) {
      perc3 = 50;
    }
    remainingPerc -= perc3;

    // leg1 is the total points from leg 1 based on the total QOV requirememt for that rank
    const leg1 = Math.round((requirements.requiredQOV * perc1) / 100);
    const leg2 = Math.round((requirements.requiredQOV * perc2) / 100);
    perc3 = 100 - perc1 - perc2;

    // cap the value of the leg at the max of the requirement for that rank
    leg1Max = leg1 >= requirements.legMaxOV ? requirements.legMaxOV : leg1;
    leg2Max = leg2 >= requirements.legMaxOV ? requirements.legMaxOV : leg2;
    leg3Max = Math.round((requirements.requiredQOV * perc3) / 100);

    // if the leg is qualified, then have the max be the same as the QOV per leg so the svg chart shows the full amount of points
    leg1Max = user.leg1OV >= leg1Max ? user.leg1OV : leg1Max;
    leg2Max = user.leg2OV >= leg2Max ? user.leg2OV : leg2Max;
    leg3Max = user.leg3OV >= leg3Max ? user.leg3OV : leg3Max;
    return {
      leg1Max,
      leg2Max,
      leg3Max,
    };
  } else {
    // HIGHER LEVELS WITH 40% MAX
    let remainingPerc = 100;
    // percentage of the first leg of the overall total requirements
    let perc1 = Math.round((user.leg1OV / requirements.requiredQOV) * 100);
    // percent of the first is capped at 40 and should be at least 30
    if (perc1 >= 40 || perc1 < 30) {
      perc1 = 40;
    }
    remainingPerc -= perc1;

    let perc2 = Math.round((user.leg2OV / requirements.requiredQOV) * 100);
    if (perc2 >= 40 || perc2 < 30) {
      perc2 = 40;
    }
    remainingPerc -= perc2;

    let perc3 = remainingPerc;
    if (perc3 >= requirements.legMaxPerc) {
      perc3 = requirements.legMaxPerc;
    }
    remainingPerc -= perc3;

    // leg1 is the total points from leg 1 based on the total QOV requirememt for that rank
    const leg1 = Math.round((requirements.requiredQOV * perc1) / 100);
    const leg2 = Math.round((requirements.requiredQOV * perc2) / 100);
    perc3 = 100 - perc1 - perc2;

    // cap the value of the leg at the max of the requirement for that rank
    leg1Max = leg1 >= requirements.legMaxOV ? requirements.legMaxOV : leg1;
    leg2Max = leg2 >= requirements.legMaxOV ? requirements.legMaxOV : leg2;
    leg3Max = Math.round((requirements.requiredQOV * perc3) / 100);

    // if the leg is qualified, then have the max be the same as the QOV per leg so the svg chart shows the full amount of points
    leg1Max = user.leg1OV >= leg1Max ? user.leg1OV : leg1Max;
    leg2Max = user.leg2OV >= leg2Max ? user.leg2OV : leg2Max;
    leg3Max = user.leg3OV >= leg3Max ? user.leg3OV : leg3Max;
    return {
      leg1Max,
      leg2Max,
      leg3Max,
    };
  }
};

export const reshapePerc = (min, max) => {
  let result = Math.round((min / max) * 100);
  if (result > 100) {
    result = 100;
  }
  return result;
};
