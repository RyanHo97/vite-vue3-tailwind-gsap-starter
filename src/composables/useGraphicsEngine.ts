import { graphicsConfig } from '../config/graphics.config'

type EngineType = 'gsap' | 'three'
const loadedEngines = ref<Set<EngineType>>(new Set())

export const useGraphicsEngine = () => {
  const loadEngine = async (engine: EngineType) => {
    if (loadedEngines.value.has(engine)) {
      return
    }

    try {
      switch (engine) {
        case 'gsap':
          await import('gsap')
          break
        case 'three':
          await import('three')
          break
      }
      loadedEngines.value.add(engine)
    } catch (error) {
      console.error(`Failed to load ${engine}:`, error)
    }
  }

  const initializeEngines = async () => {
    await Promise.all(
      graphicsConfig.enabledEngines.map(engine => loadEngine(engine))
    )
  }

  const isEngineLoaded = (engine: EngineType) => {
    return loadedEngines.value.has(engine)
  }

  return {
    loadEngine,
    initializeEngines,
    isEngineLoaded,
    loadedEngines
  }
}