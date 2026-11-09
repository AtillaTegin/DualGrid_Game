from pathlib import Path
p=Path('src/tower-scene.js');s=p.read_text();a=s.index('    const keySource',s.index('    const keySource')+1);b=s.index('    for (const d of l.doors)',a);s=s[:a]+s[b:];p.write_text(s)
