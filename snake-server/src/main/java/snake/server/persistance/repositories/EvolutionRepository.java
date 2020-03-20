package snake.server.persistance.repositories;

import org.springframework.data.repository.CrudRepository;
import snake.server.persistance.entities.EvolutionEntity;

public interface EvolutionRepository extends CrudRepository<EvolutionEntity, Long> {

}
