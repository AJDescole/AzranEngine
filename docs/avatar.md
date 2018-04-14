# Avatar breakdown
## Prerequisites

- Adobe Flash CS6
- File `a`

### File `a` instead of `n`

The file `n` has been heavily updated through times, only recent versions exist now. Also, it is linked to the file `N` which is an item library, and so makes its use compliated. 

Our goal is to analyze positions and transformations through each animation frames. 

### Objects

The avatar is splitted as : 

#### "face" group
- Left eye
- Right eye
- Mouth + nose as a whole
- Moods sprites (heart, stars, crow, ...)

#### "body" group"
- Face
- Body
- Main gear
- Hat or hair
- Left hand
- Right hand

#### Other
- Left foot
- Right foot

#### Notices

The position "left"/"right" is relative to the avatar (when the avatars faces the screen, its left foot is on the right). 
Many transformations are done to an entire group. 
The center of an object is relative to the same plan of its position. Its value is only used during rotations. Positions are absolute. 

## Analysis

### Main

Animations runs at 25fps ( 1 frame every 0.04second )

### Body group (No. 141) − front side

#### Face (No. 98) − monkey

| Scale            | Rotation | Center       | Size           | Position        |
|------------------|----------|--------------|----------------|-----------------|
| (100.0%, 100.0%) | 0°       | (66.5, 37.0) | (24.60, 20.30) | (-0.05, -12.80) |

#### Left hand (No. 37)
| Scale                | Rotation | Center      | Size          | Position       |
|----------------------|----------|-------------|---------------|----------------|
| (99.9985%, 99.9985%) | 0°       | (19.2, 5.3) | (9.25, 11.00) | (14.10, -0.70) |

#### Right hand (No. 37)

| Scale            | Rotation | Center      | Size          | Position       |
|------------------|----------|-------------|---------------|----------------|
| (100.0%, 100.0%) | 0° (?)   | (-9.3, 6.5) | (9.25, 11.00) | (-14.35, 0.45) |

#### Body (No. 35)

| Scale            | Rotation | Center       | Size           | Position       |
|------------------|----------|--------------|----------------|----------------|
| (100.0%, 100.0%) | 0°       | (21.1, 14.4) | (32.05, 37.95) | (-4.05, -9.35) |

### Foot (No. 11) − front side

| Scale            | Rotation | Center     | Size           | Position        |
|------------------|----------|------------|----------------|-----------------|
| (100.0%, 100.0%) | 0°       | (3.3, 3.3) | (22.15, 15.50) | (-13.95, -2.75) |

### Body group (No. 225) − back side

#### Left hand (No. 37)

| Scale            | Rotation | Center      | Size          | Position       |
|------------------|----------|-------------|---------------|----------------|
| (100.0%, 100.0%) | 0°       | (-9.3, 6.5) | (9.25, 11.00) | (-14.35, 0.45) |

#### Right hand (No. 37)

| Scale                | Rotation | Center      | Size          | Position       |
|----------------------|----------|-------------|---------------|----------------|
| (99.9985%, 99.9985%) | 0° (?)   | (19.0, 5.3) | (9.25, 11.00) | (13.90, -0.70) |

#### Body (No. 210)

| Scale            | Rotation | Center       | Size           | Position       |
|------------------|----------|--------------|----------------|----------------|
| (100.0%, 100.0%) | 0°       | (20.9, 13.4) | (32.05, 37.95) | (-4.25, -9.35) |

### Foot (No. 201) − back side

| Scale            | Rotation | Center     | Size           | Position        |
|------------------|----------|------------|----------------|-----------------|
| (100.0%, 100.0%) | 0°       | (2.8, 6.6) | (20.05, 14.10) | (-13.35, -1.65) |

### Body group (No. 198) − right side
#### Face + hand (No. 180)

| Scale            | Rotation | Center       | Size           | Position |
|------------------|----------|--------------|----------------|----------|
| (100.0%, 100.0%) | 0°       | (23.4, 17.3) | (24.70, 27.15) | (0, 0)   |

#### Body (No. 179)

| Scale            | Rotation | Center       | Size           | Position       |
|------------------|----------|--------------|----------------|----------------|
| (100.0%, 100.0%) | 0°       | (16.0, 13.8) | (32.05, 37.95) | (-4.30, -9.35) |

### Animation `down`

#### Body group (No. 141)

| Frame | Scale                | Rotation | Center       | Size         | Position       |
|-------|----------------------|----------|--------------|----------------|----------------|
| 1     | (100.0%, 100.0%)     | -6.8037° | (66.6, 31.5) | (46.15, 42.95) | (0.10, -21.15) |
| 2     | (99.9222%, 99.9222%) | -3.5432° | (66.6, 29.6) | (44.25, 40.8)  | (0.10, -23.1)  |
| 3     | (99.9252%, 99.9252%) | -0.5438° | (66.6, 27.8) | (42.3, 38.7)   | (0.10, -25.1)  |
| 4     | (99.8962%, 99.8962%) | 2.299°   | (66.6, 29.6) | (43.4, 39.95)  | (0.10, -23.05) |
| 5     | (99.8917%, 99.8917%) | 5.4563°  | (66.6, 31.5) | (45.4, 42.1)   | (0.10, -21.15) |
| 6     | (99.8962%, 99.8962%) | 2.3024°  | (66.6, 29.6) | (43.4, 39.95)  | (0.10, -23.05) |
| 7     | (99.8968%, 99.8968%) | -0.5438° | (66.6, 27.5) | (42.3, 38.7)   | (0.10, -25.15) |
| 8     | (99.9222%, 99.9222%) | -3.5432° | (66.6, 29.5) | (44.25, 40.80) | (0.10, -23.15) |
| 9     | (100.0%, 100.0%)     | -6.8037  | (66.6, 31.5) | (46.15, 42.95) | (0.10, -21.15) |

#### Right foot (No. 11)

| Frame | Scale                | Rotation | Center      | Size           | Position        |
|-------|----------------------|----------|-------------|----------------|-----------------|
| 1     | (81.2744%, 81.2744%) | 0°       | (3.3, 3.3)  | (18.00, 12.60) | (-8.25, -5.00)  |
| 2     | (78.0228%, 78.0228%) | 0°       | (3.3, 2.0)  | (17.30, 12.10) | (-8.25, -6.30)  |
| 3     | (74.7726%, 74.7726%) | 0°       | (3.3, 0.7)  | (16.60, 11.60) | (-8.25, -7.60)  |
| 4     | (71.521%, 71.521%)   | 0°       | (3.3, -0.7) | (15.85, 11.05) | (-8.25, -8.90)  |
| 5     | (68.2709%, 68.2709%) | 0°       | (3.3, -2.0) | (15.10, 10.60) | (-8.25, -10.20) |
| 6     | (65.0192%, 65.0192%) | 0°       | (3.3, -3.3) | (14.40, 10.10) | (-8.25, -11.50) |
| 7     | (73.0896%, 73.0896%) | 14.569°  | (3.3, -8.0) | (18.50, 15.00) | (-8.25, -16.25) |
| 8     | (77.15%, 77.15%)     | 7.261°   | (3.3, -2.4) | (18.50, 14.00) | (-8.25, -10.60) |
| 9     | (81.2744%, 81.2744%) | 0°       | (3.3, 3.3)  | (18.00, 12.60) | (-8.25, -5.00)  |

#### Left foot (No. 11)

Some rotations are unconfirmed (notably frame #1 and frame #9)

| Frame | Scale                | Rotation | Center       | Size           | Position       |
|-------|----------------------|----------|--------------|----------------|----------------|
| 1     | (65.0192%, 65.0192%) | -6.8037° | (19.8, -4.2) | (14.40, 10.10) | (8.25, -12.45) |
| 2     | (68.5699%, 68.5699%) | -6.8037° | (19.8, -6.8) | (16.20, 12.20) | (8.25, -15.10) |
| 3     | (72.1634%, 72.1634%) | -6.8037° | (19.8, -9.6) | (18.00, 14.35) | (8.20, -17.80) |
| 4     | (81.2744%, 81.2744%) | -6.8037° | (19.8, 1.8)  | (18.00, 12.60) | (8.25, -6.45)  |
| 5     | (78.0228%, 78.0228%) | 5.4563°  | (19.8, 0.6)  | (17.30, 12.10) | (8.25, -7.65)  |
| 6     | (74.7726%, 74.7726%) | 5.4563°  | (19.8, -0.6) | (16.60, 11.60) | (8.25, -8.85)  |
| 7     | (71.521%, 71.521%)   | 5.4563°  | (19.8, -1.8) | (15.85, 11.05) | (8.25, -10.05) |
| 8     | (68.2709%, 68.2709%) | 0°       | (19.8, -3.0) | (15.10, 10.60) | (8.25, -11.20) |
| 9     | (65.0192%, 65.0192%) | 0°       | (19.8, -4.2) | (14.40, 10.10) | (8.25, -12.45) |

### Animation `up`

#### Body group (No. 225)

| Frame | Scale                | Rotation | Center       | Size           | Position        |
|-------|----------------------|----------|--------------|----------------|-----------------|
| 1     | (99.9664%, 99.9664%) | 5.5326°  | (26.0, 17.1) | (45.2, 42,15)  | (-0.35, -19.10) |
| 2     | (99.9664%, 99.9664%) | 2.7544°  | (26.0, 15.9) | (43.5, 40.25)  | (-0.35, -20.40) |
| 3     | (99.9985%, 99.9985%) | 0°       | (26.0, 14.7) | (41.75, 38,30) | (-0.35, -24.60) |
| 4     | (99.9756%, 99.9756%) | -2.2876° | (26.0, 15,9) | (43.30, 39.90) | (-0.35, -20.35) |
| 5     | (99.9725%, 99.9725%) | -4.799°  | (26.0, 17.1) | (44.75, 41.65) | (-0.35, -19.10) |
| 6     | (99.9725%, 99.9725%) | -2.2876° | (26.0, 15.9) | (43.30, 39.90) | (-0.35, -20.30) |
| 7     | (99.9985%, 99.9985%) | 0°       | (26.0, 14.7) | (41.75, 38.30) | (-0.35, -21.60) |
| 8     | (99.968%, 99.968%)   | 2.7544°  | (26.0, 15.9) | (43.50, 40.25) | (-0.35, -20.35) |
| 9     | (99.9664%, 99.9664%) | 5.5326°  | (26.0, 17.1) | (45.20, 42.15) | (-0.35, -19.10) |

#### Left foot (No. 201)

| Frame | Scale                 | Rotation | Center      | Size           | Position        |
|-------|-----------------------|----------|-------------|----------------|-----------------|
| 1     | (87.8998%,  87.8998%) | 0°       | (2.8, 6.6)  | (17.65, 12.40) | (-7.75, -1.00)  |
| 2     | (82.5897%, 82.5897%)  | 4.5332°  | (2.0, 1.8)  | (17.40, 12.90) | (-8.55, -5.80)  |
| 3     | (77.3193%, 77.3193%)  | 9.26°    | (1.3, -3.0) | (17.05, 13.25) | (-9.25, -10.50) |
| 4     | (71.5485%, 71.5485%)  | 4.5323°  | (2.0, -2.0) | (15.10, 11.25) | (-8.55, -9.55)  |
| 5     | (65.8142%, 65.8142%)  | 0°       | (2.8, -0.9) | (13.20, 9.30)  | (-7.75, -8.50)  |
| 6     | (69.6716%, 69.6716%)  | 0°       | (2.8, 0.8)  | (13.95, 9.80)  | (-7.75, -6.75)  |
| 7     | (73.5275%, 73.5275%)  | 0°       | (2.8, 2.5)  | (14.75, 10.35) | (-7.75, -5.00)  |
| 8     | (80.7144%, 80.7144%)  | 0°       | (2.8, 4.5)  | (16.20, 11.40) | (-7.75, -3.00)  |
| 9     | (87.8998%, 87.8998%)  | 0°       | (2.8, 6.6)  | (17.65, 12.40) | (-7.75, -1.00)  |

#### Right foot (No. 201)

| Frame | Scale                | Rotation    | Center       | Size           | Position        |
|-------|----------------------|-------------|--------------|----------------|-----------------|
| 1     | (63.269%, 63.269%)   | 5.5326° (?) | (18.3, -0.7) | (12.7, 8.95)   | (7.75, -8.20)   |
| 2     | (66.5756%, 66.5756%) | 5.5326° (?) | (18.3, 1.1)  | (13.35, 9.40)  | (7.75, -6.50)   |
| 3     | (69.8822%, 69.8822%) | 5.5326° (?) | (18.3, 2.9)  | (14.05, 9.85)  | (7.75, -4.70)   |
| 4     | (76.4954%, 76.4954%) | 0°          | (18.3, 4.8)  | (15.35, 10.75) | (7.75, -2.70)   |
| 5     | (83.1085%, 83.1085%) | 0°          | (18.3, 6.8)  | (16.65, 11.70) | (7.75, -0.70)   |
| 6     | (80.4947%, 80.4947%) | 0°          | (20.0, 1.6)  | (17.00, 12.65) | (9.50, -5.90)   |
| 7     | (77.9205%, 77.9205%) | 0°          | (21.8, -3.7) | (17.20, 13.35) | (11.25, -11.20) |
| 8     | (70.575%, 70.575%)   | 0°          | (20.0, -2.2) | (14.95, 11.10) | (9.50, -9.75)   |
| 9     | (63.269%, 63.269%)   | 0°          | (18.3, -0.7) | (12.70, 8.95)  | (7.75, -8.20)   |

### Animation `left` and `right`

Reversed

#### Body group (No. 199)

| Frame | Scale                | Rotation | Center       | Size           | Position        |
|-------|----------------------|----------|--------------|----------------|-----------------|
| 1     | (99.9985%, 99.9985%) | 0°       | (23.4, 17.3) | (32.05, 38.30) | (-0.35, -18.30) |
| 2     | (99.9985%, 99.9985%) | 0°       | (23.4, 15.3) | (32.05, 38.30) | (-0.35, -20.30) |
| 3     | (99.9985%, 99.9985%) | 0°       | (23.4, 13.3) | (32.05, 38.30) | (-0.35, -22.30) |
| 4     | (99.9985%, 99.9985%) | 0°       | (23.4, 15.3) | (32.05, 38.30) | (-0.35, -20.30) |
| 5     | (99.9985%, 99.9985%) | 0°       | (23.4, 17.3) | (32.05, 38.30) | (-0.35, -18.30) |
| 6     | (99.9985%, 99.9985%) | 0°       | (23.4, 15.3) | (32.05, 38.30) | (-0.35, -20.30) |
| 7     | (99.9985%, 99.9985%) | 0°       | (23.4, 13.3) | (32.05, 38.30) | (-0.35, -22.30) |
| 8     | (99.9985%, 99.9985%) | 0°       | (23.4, 15.3) | (32.05, 38.30) | (-0.35, -20.30) |
| 9     | (99.9985%; 99.9985%) | 0°       | (23.4, 17.3) | (32.05, 38.30) | (-0.35, -18.30) |

#### Right foot (`right`) (No. 165)

| Frame | Scale                | Rotation  | Center       | Size           | Position        |
|-------|----------------------|-----------|--------------|----------------|-----------------|
| 1     | (97.226%, 97.226%)   | 27.3196°  | (-4.0, -2.5) | (21.10, 17.95) | (-13.80, -8.45) |
| 2     | (97.2244%, 97.2244%) | 4.0542°   | (7.2, -2.3)  | (19.00, 12.00) | (-2.65, -8.30)  |
| 3     | (97.2626%, 97.2626%) | -18.8938° | (18.4, -2.2) | (20.70, 16.10) | (8.60, -8.20)   |
| 4     | (97.1619%, 97.1619%) | -10.2865° | (16.7, 0.5)  | (19.85, 13.85) | (6.85, -5.55)   |
| 5     | (97.1695%, 97.1695%) | -1.8458°  | (14.9, 3.0)  | (18.55, 11.35) | (5.00, -3.00)   |
| 6     | (97.1588%, 97.1588%) | -1.7733°  | (8.6, 3.3)   | (18.55, 11.25) | (-1.30, -2.75)  |
| 7     | (97.1588%, 97.1588%) | -1.7733°  | (2.3, 3.5)   | (18.55, 11.25) | (-7.60, -2.55)  |
| 8     | (97.1695%, 97.1695%) | -1.8458°  | (-4.0, 3.7)  | (18.55, 11.35) | (-13.90, -2.30) |
| 9     | (97.226%, 97.226%)   | 27.3196°  | (-4.0, -2.5) | (21.10, 17.95) | (-13.80, -8.45) |

#### Left foot (`right`) (No. 165)

| Frame | Scale                | Rotation  | Center       | Size           | Position        |
|-------|----------------------|-----------|--------------|----------------|-----------------|
| 1     | (89.9994%, 89.9994%) | 0°        | (7.3, 2.4)   | (16.85, 9.95)  | (-2.50, -3.60)  |
| 2     | (89.1495%, 89.1495%) | -0.528°   | (3.2, 2.4)   | (16.75, 10.00) | (-6.65, 3.65)   |
| 3     | (88.298%; 88.298%)   | -1.0569°  | (-0.9, 2.3)  | (16.75, 10.05) | (-10.80, -3.70) |
| 4     | (87.4542%, 87.4542%) | -1.8467°  | (-5.1, 2.3)  | (16.65, 10.20) | (-14.95, -3.75) |
| 5     | (87.6923%, 87.6923%) | 29.9999°  | (-3.7, -0.9) | (19.10, 16.60) | (-13.55, -6.90) |
| 6     | (87.5854%, 87.5854%) | 5.5144°   | (6.8, -2.3)  | (17.25, 11.15) | (-3.00, -8.25)  |
| 7     | (87.5366%, 87.5366%) | -18.8938° | (17.3, -3.5) | (18.70, 14.45) | (7.45, -9.55)   |
| 8     | (87.4298%, 87.4298%) | -12.3116° | (17.1, -1.0) | (18.10, 12.90) | (7.20, -7.00)   |
| 9     | (87.4451%, 87.4451%) | -6.0293   | (16.8, 1.6)  | (17.35, 11.30) | (6.95, -4.35)   |
