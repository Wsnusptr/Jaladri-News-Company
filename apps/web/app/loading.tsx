import { JaladriLoader } from '@/components/shared/JaladriLoader';

export default function Loading() {
  return (
    <JaladriLoader 
      size="lg" 
      text="Jaladri News" 
      subtext="The latest and most recent news"
      fullScreen={true}
    />
  );
}