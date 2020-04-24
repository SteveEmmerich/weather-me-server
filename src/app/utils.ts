const DIRECTIONS = [
  'North',
  'North by North East',
  'North East',
  'East by North East',
  'East',
  'East by South East',
  'South East',
  'South by South East',
  'South',
  'South by South West',
  'South West',
  'West by South West',
  'West',
  'West by North West',
  'North West',
  'North by North West',
  'North',
];
const calculateWindDirection = (degrees: number) => {
  const ensureDegrees = degrees % 360;
  const sectorIndex = Math.round(ensureDegrees / 22.5);
  const directionString = DIRECTIONS[sectorIndex];
  return directionString;
};

export { calculateWindDirection };
