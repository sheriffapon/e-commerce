export function Logo() {
  const text = 'Pero Collection';

  return (
    <div className="font-headline text-xl font-bold tracking-tight text-foreground">
      {text.split('').map((letter, index) => (
        <span
          key={index}
          className="logo-letter"
          style={{
            animationDelay: `${index * 0.05}s`,
            display: letter === ' ' ? 'inline' : 'inline-block' 
          }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
}
