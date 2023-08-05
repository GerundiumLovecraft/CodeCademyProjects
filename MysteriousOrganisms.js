// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

function pAequorFactory(num, dnaStrand) {
  return {
    _specimenNum: num,
    _dna: dnaStrand,
    get dna() {
      return this._dna;
    },
    get specimenNum() {
      return this._specimenNum;
    },
    mutate: function() {
      let randLoc = Math.floor(Math.random()) * this._dna.length;
      let newBase = returnRandBase();
      while (this._dna[randLoc] === newBase) {
        newBase = returnRandBase();
      };
      this._dna[randLoc] = newBase;
    },
    compareDNA: function(pAequor) {
      counter = 0;
      for (let i = 0; i < 15; i++) {
        if (this._dna[i] === pAequor.dna[i]) {
          counter++;
        };
      }
      let percentCommon = (counter / 15) * 100
      console.log(`Specimen #${this._specimenNum} and specimen #${pAequor.specimenNum} have ${Math.round(percentCommon)}% DNA in common.`);
      return percentCommon;
    },
    willLikelySurvive: function() {
      counter = 0
      for (let j = 0; j < 15; j++) {
        if (this._dna[j] === 'C' || this._dna[j] === 'G') {
          counter++
        };
      };
      if (((counter / 15) * 100) > 60) {
        return true;
      } else {
        return false;
      };
    },
    complementStrand: function() {
      let complementaryStrand = []
      for (let k = 0; k < 15; k++) {
        if (this._dna[k] === 'A') {
          complementaryStrand.push('T');
        } else if (this._dna[k] === 'T') {
          complementaryStrand.push('A');
        } else if (this._dna[k] === 'C') {
          complementaryStrand.push('G');
        } else if (this._dna[k] === 'G') {
          complementaryStrand.push('C');
        };
      }
      return complementaryStrand;
    }
  };
};

const arrOfSpecimen = [];
for (let a = 1; a <= 30; a++) {
  let mystOrg = pAequorFactory(a, mockUpStrand())
  while (mystOrg.willLikelySurvive() !== true) {
    mystOrg = pAequorFactory(a, mockUpStrand())
  };
  arrOfSpecimen.push(mystOrg);
  mystOrg = 0
};

function findMostCommon(arr) {
  let maxSimilarityStr = ``;
  let maxSimilarity = 0
  for (x in arr) {
    for (y in arr) {
      if (x === y) {
        continue;
      } else {
        if (arr[x].compareDNA(arr[y]) > maxSimilarity) {
          maxSimilarity = arr[x].compareDNA(arr[y]);
          maxSimilarityStr = `Specimen #${arr[x].specimenNum} and Specimen #${arr[y].specimenNum} have the most similar DNA structure among the specimens in the array (${maxSimilarity}%).`
        }
      };
    };
  };
  console.log(maxSimilarityStr);
};
