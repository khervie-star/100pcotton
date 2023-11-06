export const parseCommission = (commission) => {
  let pc = commission.slice(0, commission.length - 1);
  if (pc >= 100) {
    pc = 100;
  } else if (pc <= 0) {
    pc = 0;
  } else {
    pc = pc;
  }
  return pc;
};
