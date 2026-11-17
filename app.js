
function init() {
  ['ringDia', 'pitHeight', 'blockWidth', 'fillDepth'].forEach(id => {
    document.getElementById(id).addEventListener('change', calc);
    document.getElementById(id).addEventListener('input', calc);
  });
  calc();
}

function calc() {
  const insideD = parseFloat(document.getElementById('ringDia').value)||36;
  const hgt = parseFloat(document.getElementById('pitHeight').value)||16;
  const frontW = parseFloat(document.getElementById('blockWidth').value)||11.5;
  const fillD = parseFloat(document.getElementById('fillDepth').value)||4;

  // Assuming block depth is 8 inches, mean centerline diameter = insideD + 8
  const centerD = insideD + 8;
  const outsideD = insideD + 16;
  const circ = Math.PI * centerD;

  const perCourse = Math.ceil(circ / frontW);
  const courses = Math.round(hgt / 4); // standard block is 4" tall
  const totalBlocks = perCourse * courses;

  // Lava rock volume: pi * (insideD/2)^2 * fillD in cu in -> cu ft
  const volCuIn = Math.PI * Math.pow(insideD / 2, 2) * fillD;
  const volCuFt = volCuIn / 1728;
  // 10lb bag of lava rock is approx 0.35 cu ft
  const lavaBags = Math.max(1, Math.ceil(volCuFt / 0.35));

  document.getElementById('totalBlocks').textContent = totalBlocks;
  document.getElementById('blocksPerCourse').textContent = `${perCourse} Blocks Per Course (${courses} Courses)`;
  document.getElementById('steelRingSpec').textContent = `${insideD}" Diameter`;
  document.getElementById('lavaBags').textContent = `${lavaBags} Bags (10 lb)`;
  document.getElementById('outsideDia').textContent = `≈ ${Math.round(outsideD)} Inches`;
  document.getElementById('screenSpec').textContent = `${insideD + 2}" Mesh Dome`;
}
window.addEventListener('DOMContentLoaded', init);
