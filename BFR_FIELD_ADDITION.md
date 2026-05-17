# Ajout du Champ BFR (Besoin en Fonds de Roulement)

## Modifications Effectuées

### 1. **App.jsx** - Ajout du paramètre par défaut

Ajout du paramètre `bfrInitial` avec valeur 0 par défaut dans `defaultParams`:

```javascript
// BFR
bfrInitial: 0,
```

### 2. **StepParams.jsx** - Interface utilisateur

- **Ajout du champ BFR** dans la section "Données d'exploitation":

  ```jsx
  <Field
    label="Besoin en Fonds de Roulement initial"
    value={params.bfrInitial || 0}
    onChange={(v) => set("bfrInitial", v)}
    suffix="DA"
    min={0}
  />
  ```

- **Mise à jour du calcul d'équilibre** pour inclure BFR dans les besoins totaux:
  - Avant: `const ok = Math.abs(totalFinancement - params.montantInvest) < 1;`
  - Après:
    ```javascript
    const totalBesoins = params.montantInvest + (params.bfrInitial || 0);
    const ok = Math.abs(totalFinancement - totalBesoins) < 1;
    ```

- **Améliorations du message de déséquilibre** pour afficher les détails:
  ```javascript
  `Total = ${DA(totalFinancement)} DA ≠ Besoins ${DA(totalBesoins)} DA (Invest: ${DA(params.montantInvest)} + BFR: ${DA(params.bfrInitial || 0)}) — déséquilibré`;
  ```

### 3. **math.js** - Logique de calcul (déjà en place)

Le fichier math.js avait déjà l'infrastructure pour supporter le BFR:

- Le BFR est inclus dans les besoins de l'année 1
- `besoins = p.montantInvest + (p.bfrInitial || 0)` en année 1
- Le BFR est stocké dans le plan: `bfr: i === 0 ? (p.bfrInitial || 0) : 0`

### 4. **StepPlan.jsx** - Affichage du plan de financement

Ajout du BFR comme ligne distincte dans le tableau des besoins:

```javascript
{ label: 'Besoin en Fonds de Roulement', key: 'bfr' },
```

Le BFR s'affiche maintenant séparément de l'investissement dans le plan pluriannuel.

## Impact Fonctionnel

✅ **Équilibre Financier**: Le BFR est maintenant correctement intégré dans le calcul d'équilibre
✅ **Visualisation**: Le BFR est affiché dans le plan de financement
✅ **Flexibilité**: L'utilisateur peut définir un BFR initial optionnel
✅ **Viabilité**: Le BFR est considéré dans les besoins totaux de financement

## Cas d'Usage

**Exemple**: Une entreprise a besoin de:

- Investissement: 4,500,000 DA
- BFR initial: 500,000 DA (stocks, créances clients)

Le système demandera maintenant 5,000,000 DA de financement total au lieu de 4,500,000 DA.

## Validation

✅ Build successful sans erreurs
✅ 1729 modules transformés avec succès
✅ Fichier généré: 232.52 kB (gzip: 71.06 kB)
